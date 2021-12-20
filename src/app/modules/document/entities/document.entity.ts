import { UPLOAD_STATUS_ENUM } from '../../../shared/shared.constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IDocument } from '../document.interface';

@Entity({ name: 'document' })
export class Document implements IDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: true })
  file_name: string;

  @Column({ length: 10, nullable: true })
  file_type: string;

  @Column({ type: 'text' })
  pre_signed_get_url: string;

  @Column({ type: 'text' })
  pre_signed_put_url: string;

  @Column({ type: 'text' })
  key: string;

  @Column({
    type: 'enum',
    enum: UPLOAD_STATUS_ENUM,
    default: UPLOAD_STATUS_ENUM.PENDING,
  })
  upload_status: UPLOAD_STATUS_ENUM;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_parsed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
