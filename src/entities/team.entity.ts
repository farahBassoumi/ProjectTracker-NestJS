import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Team {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=>Project)
  project: Project;

  @Column()
  teamLeader: User;

  @Column()
  subLeaders: User[];

  @Column()
  members: User[];
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
