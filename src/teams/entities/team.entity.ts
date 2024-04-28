import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Project } from "../../projects/entities/project.entity";

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Project)
  project: Project;

  @Column()
  teamLeader: User;

  @Column()
  subLeaders: User[];

  @Column()
  members: User[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;
}
