import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Project } from './project.entity';

@Entity()
export class Progress {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(()=>Project)
  project: Project;

 
}
