import { Injectable } from '@nestjs/common';
import { PreSignedUrls } from '../../../modules/document/document.interface';
import { LoggerService, S3Service } from '../../../shared/services';
import { SIGNEDURLEXPIRESECONDS } from '../../../shared/shared.constants';

@Injectable()
export class FileService {
  private readonly logger = new LoggerService(FileService.name);
  constructor(private s3Service: S3Service) {}

  public async generatePreSignedUrls(): Promise<PreSignedUrls> {
    try {
      const [readUrl, writeUrl, key] =
        await this.s3Service.generatePresignedUrls();
      return {
        readUrl,
        writeUrl,
        key,
        validityInSeconds: SIGNEDURLEXPIRESECONDS,
      };
    } catch (error) {
      this.logger.error(`Error on generating presigned url(s) -> ${error}`);
      this.handleServiceError(error);
    }
  }

  public async saveS3Object(key: string): Promise<string> {
    try {
      return this.s3Service.downloadFile(key);
    } catch (error) {
      this.logger.error(`Error on saving S3Object -> ${error}`);
      this.handleServiceError(error);
    }
  }
  public async deleteObject(key: string): Promise<boolean> {
    return this.s3Service.deleteFile(key);
  }
  

  private handleServiceError(error: Error) {
    throw error;
  }
}
