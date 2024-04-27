import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Event {
  constructor() {
    this.id = uuidv4(); 
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(()=>User)
  owner: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
