import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Member } from '../../members/entities/member.entity';
import { Invitation } from 'src/invitations/entities/invitation.entity';

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

  @OneToMany(() => Invitation, (invitation) => invitation.team)
  invitations: Invitation[];

  @CreateDateColumn()
  createdAt: Date;
}
