import { EntityRepository, Repository } from 'typeorm';
import { IClientData } from './client-data.interface';
import { ClientData } from './entities/client-data.entity';

@EntityRepository(ClientData)
export class ClientDataRepository extends Repository<IClientData> {
  async createRecords(records: IClientData[]): Promise<any> {
    return this.insert(records);
  }
}
