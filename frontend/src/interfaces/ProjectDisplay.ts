import { Project } from './Project';

export type ProjectStatus = 'Done' | 'In progreess' | 'Not started';

export interface ProjectDisplay extends Omit<Project, 'tasks' | 'team'> {
  status: ProjectStatus;
  completion: number;
}
