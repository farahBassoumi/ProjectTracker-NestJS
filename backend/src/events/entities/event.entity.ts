import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from '../enums/event-type-enum';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  type: EventType;

  @OneToOne(() => User)
  user: User;

  @ManyToOne(() => Project)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;
}
