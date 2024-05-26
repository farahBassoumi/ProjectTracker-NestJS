import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  contents: string;

  @ManyToOne(() => Task)
  task: Task;

  @ManyToOne(() => Comment)
  repliesTo?: Comment;

  @OneToMany(() => Comment, (comment) => comment.repliesTo, {
    onDelete: 'CASCADE',
  })
  replies: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}
