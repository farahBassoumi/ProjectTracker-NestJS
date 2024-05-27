import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Role } from './enum/role.enum';
import { Team } from '../../teams/entities/team.entity';

@Entity('member')
export class Member {
  @PrimaryColumn('uuid')
  teamId: string;

  @PrimaryColumn('uuid')
  userId: string;

  @ManyToOne(() => Team)
  team: Team;

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Member,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
}
