import { Project } from './Project';
import { User } from './User';

export interface Team {
  id?: string;
  project: Project;
  teamLeader: User;
  subLeaders?: User[];
  members?: User[];
  createdAt?: Date;
}
