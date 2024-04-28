import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";
import { TaskStatus } from "../enums/task-status.enum";
import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @Column()
  status: TaskStatus;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @Column()
  assignor: User;

  @Column()
  assignees: User[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;
}
