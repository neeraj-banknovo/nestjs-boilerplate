import * as aws from 'aws-sdk';
import { AppConfig, AuthConfig, DatabaseConfig, S3Config } from './config.interface';

const env: NodeJS.ProcessEnv = process.env;

export const appConfig = (): AppConfig => ({
  env: env.NODE_ENV,
  port: parseInt(env.PORT),
  appName: env.APP_NAME || 'NESTJS SERVER',
  enableSwagger: true,
});

export const dbConfig = (): DatabaseConfig => ({
  port: parseInt(env.DB_PORT),
  dialect: env.DB_DIALECT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASS,
  host: env.DB_HOST,
});

export const s3Config = (): S3Config => ({
  awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  awsS3Bucket: env.AWS_S3_BUCKET,
  awsS3KmsKeyArn: env.AWS_S3_KMS_KEY_ARN,
  awsSessionToken: env.AWS_SESSION_TOKEN,
  awsRegion: env.AWS_REGION,
  endpoint: env.AWS_S3_ENDPOINT,
});

export const authConfig = (): AuthConfig => ({
  domain: process.env.OKTA_BASE_URL,
  appId: process.env.CLIENT_ID,
  audience: process.env.OKTA_AUDIENCE,
});

const s3DefaultConfig = (): aws.S3.ClientConfiguration => ({
  apiVersion: 'latest',
  accessKeyId: s3Config().awsAccessKeyId,
  secretAccessKey: s3Config().awsSecretAccessKey,
  sessionToken: s3Config().awsSessionToken,
  endpoint: s3Config().endpoint,
  region: s3Config().awsRegion,
  signatureVersion: 'v4',
  sslEnabled: true,
});

const s3GeneratorConfig = {
  development: {
    ...s3DefaultConfig(),
    s3ForcePathStyle: true,
  },
  production: s3DefaultConfig(),
}[process.env.NODE_ENV];

export const s3Generator = (): aws.S3 => new aws.S3(s3GeneratorConfig);

