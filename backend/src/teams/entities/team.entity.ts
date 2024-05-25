import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Member } from './member.entity';

@Entity('team')
export class Team {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'id' })
  project: Project;

  @OneToMany(() => Member, (member) => member.team, {
    cascade: ['insert'],
  })
  members: Member[];

  @CreateDateColumn()
  createdAt: Date;
}
