import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Comment {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  owner: User;

  @Column()
  task: Task;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column()
  replies: Comment[];
}
