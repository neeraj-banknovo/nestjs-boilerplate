import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CaseStudyController, DocumentController } from './document.controller';
import { SharedModule } from '../../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentRepository]),
    SharedModule,
  ],
  controllers: [DocumentController, CaseStudyController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule { }
