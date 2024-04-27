import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Team {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

 

  @Column()
  projects: Project[];

  @Column()
  teamLeader: User;

  @Column()
  subLeaders: User[];

  @Column()
  members: User[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
