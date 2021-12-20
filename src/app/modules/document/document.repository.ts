import { EntityRepository, Repository } from 'typeorm';
import { IDocument } from './document.interface';
import { Document } from './entities/document.entity';

@EntityRepository(Document)
export class DocumentRepository extends Repository<IDocument> {
  async findAllDocuments(where?: any): Promise<IDocument[]> {
    return this.find({
      ...where,
    });
  }

  async findDocumentById(id: string): Promise<IDocument> {
    return this.findOne(id);
  }

  async createDocumentRecord(data: any): Promise<any> {
    return this.save(data);
  }
}
