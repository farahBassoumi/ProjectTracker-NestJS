// src/interfaces/Project.ts

import { Task } from "./Task";
import { Progress } from "./Progress";
import { Team } from "./Team";

export interface Project {
  id?: string;
  name: string;
  tasks?: Task[];
  progress?: Progress;
  teams?: Team[];
  createdAt?: Date;
  updatedAt?: Date;
}
