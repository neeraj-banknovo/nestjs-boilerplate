import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig, dbConfig, s3Config } from './config/config';
import { DatabaseModule } from './database/database.module';
import { CronJobModule } from './jobs/jobs.module';
import { DocumentModule } from './modules/document/document.module';
import { HealthTerminusModule } from './health-terminus/health-terminus.module';
import { ClientDataModule } from './modules/client-data/client-data.module';

const configs = [appConfig, dbConfig, s3Config];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configs],
      isGlobal: true,
    }),
    HealthTerminusModule,
    // CronJobModule,
    DatabaseModule,
    DocumentModule,
    ClientDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
