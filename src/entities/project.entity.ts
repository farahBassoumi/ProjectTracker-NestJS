import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.entity';
import { Progress } from './progress.entity';
import { Team } from './team.entity';

@Entity()
export class Project {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(()=>Task, task=>task.project)
  tasks: Task[];

  @OneToOne(()=>Progress)
  progress: Progress;

  @OneToMany(()=>Team,team=>team.project)
  teams: Team[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  lastModifiedDate: Date;


}
