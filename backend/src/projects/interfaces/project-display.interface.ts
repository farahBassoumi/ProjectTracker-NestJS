export type ProjectStatus = 'Done' | 'In progreess' | 'Not started';

export interface ProjectDisplay {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  completion: number;
  createdAt: Date;
  updatedAt: Date;
}
