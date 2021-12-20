import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CRON_EXPRESSION } from './jobs.enums';
import { LoggerService } from '../shared/services/logger/logger.service';
import { DocumentService } from '../modules/document/document.service';

@Injectable()
export class DocumentCleanupCronHandler {
  private readonly logger: LoggerService = new LoggerService(DocumentCleanupCronHandler.name);;
  constructor(
    private docService: DocumentService
  ) {}

  @Cron(CRON_EXPRESSION.EVERY_10_SECONDS)
  async documentCleanupFunction() {
    this.logger.log('I am executed to cleanup the junk documents');
    try {
      const documents = await this.docService.getAllDocuments({
        is_deleted: false,
        is_parsed: false,
      });

      if (!documents.length) return;
      for await (const document of documents) {
        // write cron logic here...
      }

    } catch (error) {
      this.logger.error('Some error in cron job execution : ', error);
    }
  }
}
