import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EventType } from '../enums/event-type-enum';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: EventType;

  @ManyToOne(() => User)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;
}
