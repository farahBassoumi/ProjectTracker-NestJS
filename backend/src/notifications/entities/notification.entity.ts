import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: notificationTypes;

  @ManyToOne(() => User)
  @Column()
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}

export enum notificationTypes {
  PROJECT_INVITATION = 'project.invitaion',
  TASK_ASSIGNMENT = 'task.assignment',
  TASK_COMMENT = 'task.comment',
  TASK_DELETION = 'task.deletion',
  TASK_REASSIGNMENT = 'task.reassignment',
}
