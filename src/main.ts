require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { setUpSwagger } from './swagger.config';
import { INestApplication, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { appConfig } from './app/config/config';
import { ResponseTransformInterceptor } from './app/shared/interceptors/response.interceptor';
import { LoggerService } from './app/shared/services/logger/logger.service';

async function configSwagger(app: INestApplication): Promise<OpenAPIObject> {
  return setUpSwagger(app);
}

async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app: INestApplication = await NestFactory.create<INestApplication>(
    AppModule,
    opts
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableCors();
  if (appConfig().enableSwagger) {
    const document: OpenAPIObject = await configSwagger(app);
    SwaggerModule.setup('api-docs', app, document);
  }
  await app.listen(appConfig().port);
  new LoggerService('APP').log(
    `${appConfig().appName} is running and pointing to => ${
      appConfig().env
    }`
  );
}
bootstrap();
