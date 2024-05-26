import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Team } from '../../teams/entities/team.entity';
import { InvitationStatus } from '../enum/invitation-status.enum';

@Entity('invitation')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @ManyToOne(() => Team)
  team: Team;

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.Pending,
  })
  status: InvitationStatus;

  @Column({
    name: 'expiration_date',
    type: 'timestamptz',
  })
  expirationDate: Date;
}
