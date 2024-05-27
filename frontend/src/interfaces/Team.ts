import { Member } from './Member';
import { Project } from './Project';

export interface Team {
  id?: string;
  project: Project;
  members?: Member[];
  createdAt?: Date;
}
