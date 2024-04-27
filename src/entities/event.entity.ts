import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Event {
  constructor() {
    this.id = uuidv4(); // Generate a UUID v4 for the id property
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  owner: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
