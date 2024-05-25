import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => User)
  teamLeader: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'team_sub_leader',
    joinColumn: {
      name: 'team',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  subLeaders: User[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'team_member',
    joinColumn: {
      name: 'team',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  members: User[];

  @CreateDateColumn()
  createdAt: Date;
}
