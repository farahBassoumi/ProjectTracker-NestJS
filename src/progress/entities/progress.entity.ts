import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";

@Entity()
export class Progress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Project)
  project: Project;
}
