import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "../../tasks/entities/task.entity";
import { Progress } from "../../progress/entities/progress.entity";
import { Team } from "../../teams/entities/team.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToOne(() => Progress)
  progress: Progress;

  @OneToMany(() => Team, (team) => team.project)
  teams: Team[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastModifiedDate: Date;
}
