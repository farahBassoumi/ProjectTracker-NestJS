import { InvitationStatus } from './InvitationStatus';
import { Team } from './Team';
import { User } from './User';

export interface Invitation {
  id: string;
  sender: User;
  receiver: User;
  team: Team;
  status: InvitationStatus;
  expirationDate: Date;
}
