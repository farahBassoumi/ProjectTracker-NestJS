import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {Comment} from './comment.entity';
import { TaskStatus } from './taskStatus.enum';
import { User } from './user.entity';
import { Project } from './project.entity';
@Entity()
export class Task {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  comments: Comment[];

  @Column()
  status: TaskStatus;

  @Column()
    project: Project;

  @Column()
  assignor: User[];

  @Column()
  assignees: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
