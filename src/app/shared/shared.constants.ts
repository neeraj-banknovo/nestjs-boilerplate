/* 
    S3 constants
*/

export const BUCKET_PREFIX = 'backend';
export const UNPARSED_PATH = 'unparsed';
export const SIGNEDURLEXPIRESECONDS = 60 * 5;


export enum UPLOAD_STATUS_ENUM {
  PENDING = 'PENDING',
  UPLOADED = 'UPLOADED',
  
  // to be set by cron job along with soft delete
  EXPIRED = 'EXPIRED',
  UNLINKED = 'UNLINKED',
};

export const TEMP_FILE_PATH = './temp/';

