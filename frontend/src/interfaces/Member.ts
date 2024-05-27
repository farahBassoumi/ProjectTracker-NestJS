import { Team } from './Team';
import { User } from './User';

export enum Role {
  Leader = 'LEADER',
  SubLeader = 'SUB_LEADER',
  Member = 'MEMBER',
}

export interface Member {
  teamId: string;
  userId: string;
  team?: Team;
  user?: User;
  role: Role;
}
