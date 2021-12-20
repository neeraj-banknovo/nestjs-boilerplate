import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IDocument } from '../../document/document.interface';
import { Document } from '../../document/entities/document.entity';
import { IClientData } from '../client-data.interface';

@Entity({ name: 'client_data' })
export class ClientData implements IClientData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: true })
  division_code: string;

  @Column({ length: 255, nullable: true })
  division_name: string;

  @Column({ nullable: true })
  quantity: number;

  @Column('decimal', { precision: 20, scale: 6, nullable: true })
  amount: number;

  @Column({ type: 'uuid', nullable: true })
  document_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Document)
  @JoinColumn({ name: 'document_id', referencedColumnName: 'id' })
  document: IDocument;
}
