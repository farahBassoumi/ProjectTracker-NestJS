import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Team } from './team.entity';

@Entity()
export class Invitation {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  sender: User;

  @Column()
  reciever: User;

  @Column()
  team: Team;// not sur if i should add a project or team here
}
