import { Project } from './Project';

export enum ProjectStatus {
  Done = 'Done',
  InProgress = 'In progreess',
  NotStarted = 'Not started',
}

export interface ProjectDisplay extends Omit<Project, 'tasks' | 'team'> {
  status: ProjectStatus;
  completion: number;
}
