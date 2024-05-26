import { Task } from './Task';
import { Team } from './Team';

export interface Project {
  id?: string;
  name: string;
  description: string;
  tasks?: Task[];
  teams?: Team[];
  createdAt?: Date;
  updatedAt?: Date;
}
