import { Module, OnModuleInit } from '@nestjs/common';
import { FileService, S3Service } from './services';
import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FileService, S3Service],
  exports: [FileService, S3Service],
})
export class SharedModule implements OnModuleInit {
  private readonly logger: LoggerService = new LoggerService(SharedModule.name);
  constructor() {}

  onModuleInit() {
    this.logger.log('Module initiated and ready');
  }
}
