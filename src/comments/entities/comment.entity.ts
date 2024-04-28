import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => Task)
  task: Task;

  @Column()
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;

  @OneToMany(() => Comment, (comment) => comment.replies)
  replies: Comment[];
}
