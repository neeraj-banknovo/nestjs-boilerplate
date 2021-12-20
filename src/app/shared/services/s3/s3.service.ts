import { Injectable } from '@nestjs/common';
import { BUCKET_PREFIX, SIGNEDURLEXPIRESECONDS, TEMP_FILE_PATH, UNPARSED_PATH } from '../../shared.constants';
import { s3Config, s3Generator } from '../../../config/config';
import * as fs from 'fs';

const signedUrlParams = {
  Key: null,
  Bucket: s3Config().awsS3Bucket,
  Expires: SIGNEDURLEXPIRESECONDS,
};

@Injectable()
export class S3Service {
  constructor() { }
  /**
   *
   * @param directoryName Name of the directory to create
   * @returns A promise resolving to the Location of the directory
   */
  async createDirectory(
    bucketName: string = s3Config().awsS3Bucket
  ): Promise<void> {
    const bucketCreation = await s3Generator()
      .createBucket({
        Bucket: bucketName,
        ACL: 'authenticated-read',
      })
      .promise();

    if (bucketCreation.$response?.error) {
      throw bucketCreation.$response.error;
    }
  }

  async generatePresignedUrls(): Promise<string[]> {
    signedUrlParams.Key = `${BUCKET_PREFIX}/${UNPARSED_PATH}/${+new Date()}`;
    const putUrlRequest = s3Generator().getSignedUrlPromise(
      'putObject',
      signedUrlParams
    );

    signedUrlParams.Expires = SIGNEDURLEXPIRESECONDS * 3; // read expiry thrice of upload expiry time
    const getUrlRequest = s3Generator().getSignedUrlPromise(
      'getObject',
      signedUrlParams
    );
    return Promise.all([getUrlRequest, putUrlRequest, signedUrlParams.Key]);
  }

  async downloadFile(key: string): Promise<string> {
    const filePath = TEMP_FILE_PATH + key.split('/').pop();
    const s3File = await this.getFile(key);
    await fs.promises.writeFile(filePath, s3File.Body);
    return filePath;
  }

  private async getFile(key: string): Promise<any> {
    const s3Object = await s3Generator()
      .getObject({
        Key: `${key}`,
        Bucket: s3Config().awsS3Bucket,
      })
      .promise();
    return s3Object;
  }

  async deleteFile(key: string): Promise<boolean> {
    const filePath = TEMP_FILE_PATH + key.split('/').pop();
    await fs.promises.unlink(filePath);
    
    await s3Generator()
      .deleteObject({
        Key: key,
        Bucket: s3Config().awsS3Bucket,
      })
      .promise();
    return true;
  }
}
