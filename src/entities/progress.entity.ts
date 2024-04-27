import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Project } from './project.entity';

@Entity()
export class Progress {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  project: Project;

 
}
