import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CRON_EXPRESSION } from './jobs.enums';
import { LoggerService } from '../shared/services/logger/logger.service';
import { DocumentService } from '../modules/document/document.service';
import { FileService } from '../shared/services';
import { ClientDataService } from '../modules/client-data/client-data.service';


@Injectable()
export class ParserCronHandler {
  private readonly logger: LoggerService = new LoggerService(
    ParserCronHandler.name
  );
  constructor(
    private docService: DocumentService,
    private fileService: FileService,
    private cdService: ClientDataService
  ) {}

  @Cron(CRON_EXPRESSION.EVERY_20_SECONDS)
  async cronJobFucntionName() {
    this.logger.log('cron job started started');
    try {
      // cron logic
    } catch (error) {
      this.logger.error('Some error in cron job execution : ', error);
    }
  }
}
