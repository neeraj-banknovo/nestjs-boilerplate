import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '../../shared/services/file/file.service';
import { UPLOAD_STATUS_ENUM } from '../../shared/shared.constants';
import { LoggerService } from '../../shared/services';
import { IDocument, PreSignedUrls } from './document.interface';
import { DocumentRepository } from './document.repository';
import { CreateCaseStudyDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  private readonly logger = new LoggerService(DocumentService.name);
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(DocumentRepository)
    private readonly docRepo: DocumentRepository
  ) {}

  public async getAllDocuments(where?: any): Promise<IDocument[]> {
    return this.docRepo.findAllDocuments(where);
  }

  public async getDocumentById(id: string): Promise<IDocument> {
    try {
      const document = await this.docRepo.findDocumentById(id);
      if (!document) {
        throw new NotFoundException('Document not found');
      }
      return document;
    } catch (error) {
      this.logger.error(`Error on getDocumentById -> ${error}`);
      this.handleServiceError(error);
    }
  }

  public async generateSignedUrlRecord(): Promise<PreSignedUrls> {
    try {
      const { readUrl, writeUrl, key, validityInSeconds } =
        await this.fileService.generatePreSignedUrls();
      const documetObj: Partial<IDocument> = {
        pre_signed_get_url: readUrl,
        pre_signed_put_url: writeUrl,
        key,
      };
      const document: IDocument = await this.docRepo.createDocumentRecord(
        documetObj
      );
      return {
        id: document.id,
        key,
        writeUrl,
        validityInSeconds,
      };
    } catch (error) {
      this.logger.error(`Error on generateSignedUrlRecord -> ${error}`);
      this.handleServiceError(error);
    }
  }

  async finishDocumentParsing(document: IDocument): Promise<void> {
    document.is_parsed = true;
    await this.docRepo.save(document);

    // delete object from s3 and local
    await this.fileService.deleteObject(document.key);
  }

  public async createCaseStudy(data: CreateCaseStudyDto): Promise<any> {    
    try {
      const document = await this.docRepo.findDocumentById(data.document_id);
      if (!document) {
        throw new NotFoundException('Document not found');
      }
      document.upload_status = UPLOAD_STATUS_ENUM.UPLOADED;
      await this.docRepo.save(document);
      return {
        success: true,
        message: 'Case study submitted'
      }
    } catch (error) {
      this.logger.error(`Error on createCaseStudy -> ${error}`);
      this.handleServiceError(error);
    }
  }

  private handleServiceError(error: Error) {
    throw error;
  }
}
