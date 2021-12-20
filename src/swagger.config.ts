import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './app/config/config';

export const setUpSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(appConfig().appName)
    .setDescription('Backend service')
    .setVersion('1.0')
    .setLicense('NestJs Docs', 'https://docs.nestjs.com/')
    .setContact('Neeraj Soni', null, null)
    .addServer('http://localhost:3000/')
    .build();
  return SwaggerModule.createDocument(app, options);
};
