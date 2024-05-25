import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskStatus } from '../enums/task-status.enum';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @Column({ default: TaskStatus.IN_PROGRESS })
  status: TaskStatus;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => User)
  assignedTo?: User;

  @CreateDateColumn()
  createdAt: Date;
}
