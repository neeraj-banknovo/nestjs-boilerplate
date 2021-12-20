import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../../shared/services';
import { IClientData } from './client-data.interface';
import { ClientDataRepository } from './client-data.repository';

@Injectable()
export class ClientDataService {
  private readonly logger = new LoggerService(ClientDataService.name);
  constructor(
    @InjectRepository(ClientDataRepository)
    private readonly cdRepo: ClientDataRepository
  ) {}

  public async createClientDataRecords(record: IClientData[]) {
    try {
      return this.cdRepo.createRecords(record);
    } catch (error) {
      this.logger.error(`Error on createClientDataRecord -> ${error}`);
      this.handleServiceError(error);
    }
  }

  private handleServiceError(error: Error) {
    throw error;
  }
}
