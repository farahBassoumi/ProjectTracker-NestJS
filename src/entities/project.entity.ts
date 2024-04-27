import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.entity';
import { Progress } from './progress.entity';
import { Team } from './team.entity';

@Entity()
export class Project {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tasks: Task[];

  @Column()
  progress: Progress;

  @Column()
  teams: Team[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  lastModifiedDate: Date;


}
