import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from '../enums/event-type-enum';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  type: EventType;

  @Column()
  userId: string;

  @Column()
  projectId: string;

  @CreateDateColumn()
  createdAt: Date;
}
