import { Module, OnModuleInit, Provider } from '@nestjs/common';
import { LoggerService } from '../shared/services/logger/logger.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DocumentCleanupCronHandler } from './document.job';
import { DocumentModule } from '../modules/document/document.module';
import { ParserCronHandler } from './parser.job';
import { SharedModule } from '../shared/shared.module';
import { ClientDataModule } from '../modules/client-data/client-data.module';

/*
    CRON_JOBS is a collection of all cron jobs to be executed in system
 */

const CRON_JOBS: Provider[] = [
  // DocumentCleanupCronHandler,
  ParserCronHandler
];

/*
    CRON_JOBS_DEPS is a collection of all cron jobs dependencies.
    Add your dependencies as required
 */

const CRON_JOBS_DEPS = ([] = [
  ScheduleModule.forRoot(),
  DocumentModule,
  ClientDataModule,
  SharedModule
]);

@Module({
  imports: [...CRON_JOBS_DEPS],
  providers: [...CRON_JOBS],
  exports: [...CRON_JOBS],
})
export class CronJobModule implements OnModuleInit {
  private readonly logger = new LoggerService(CronJobModule.name);
  constructor() { }
  onModuleInit() {
    this.logger.log(`${CronJobModule.name} initiated and ready`);
  }
}
