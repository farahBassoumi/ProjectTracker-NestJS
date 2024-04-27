import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {Comment} from './comment.entity';
import { TaskStatus } from './taskStatus.enum';
import { User } from './user.entity';
import { Project } from './project.entity';
@Entity()
export class Task {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(()=>Comment,comment=>comment.task)
  comments: Comment[];

  @Column()
  status: TaskStatus;

  @ManyToOne(()=>Project,project=>project.tasks)
    project: Project;

  @Column()
  assignor: User;

  @Column()
  assignees: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
