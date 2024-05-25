import { Project } from "./Project"
import { TaskStatus } from "./TaskStatus";
import { User } from "./User";

export interface Task {
  id?: string;
  name: string;
  description: string;
  comments?: Comment[];
  status: TaskStatus;
  project: Project;
  assignor?: User;
  assignees?: User[];
  createdAt?: Date;
}