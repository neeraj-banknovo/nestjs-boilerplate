export interface AppConfig {
  env: string;
  port: number;
  appName: string;
  enableSwagger: boolean;
}

export interface DatabaseConfig {
  username?: string;
  password?: string;
  database?: string;
  port?: number | string;
  dialect?: string;
  host?: string;
}

export type S3Config = {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsS3Bucket: string;
  awsS3KmsKeyArn: string;
  awsSessionToken: string;
  awsRegion: string;
  // used in localStack
  endpoint: string;
};

export type AuthConfig = {
  domain: string;
  appId: string;
  audience: string;
};
