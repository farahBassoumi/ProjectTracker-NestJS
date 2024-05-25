// project-calculation-details.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectCalculationDetails {
  @IsNumber()
  @IsNotEmpty()
  totalTasks: number;

  @IsNumber()
  @IsNotEmpty()
  tasksToDo: number;

  @IsNumber()
  @IsNotEmpty()
  tasksInProgress: number;

  @IsNumber()
  @IsNotEmpty()
  tasksDone: number;
}
