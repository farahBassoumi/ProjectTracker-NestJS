import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Team } from './team.entity';

@Entity()
export class Invitation {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=>User)
  sender: User;

  @ManyToOne(()=>User)
  reciever: User;

  @ManyToOne(()=>Team)
  team: Team; // not sure whether the invi should be sent to join a team or a project
}
