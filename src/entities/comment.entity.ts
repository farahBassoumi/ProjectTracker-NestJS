import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Comment {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=>User)
  owner: User;

  @ManyToOne(()=>Task)
  task: Task;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @OneToMany(()=>Comment,comment=>comment.replies)
  replies: Comment[];
}
