import { Module } from '@nestjs/common';
import { ClientDataService } from './client-data.service';
import { ClientDataController } from './client-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { ClientDataRepository } from './client-data.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientDataRepository]),
    SharedModule
  ],
  controllers: [ClientDataController],
  providers: [ClientDataService],
  exports: [ClientDataService],
})
export class ClientDataModule {}
