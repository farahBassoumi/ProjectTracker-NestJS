import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../enums/task-status.enum';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, ['project']),
) {
  
  @IsOptional()
  @IsEnum(TaskStatus) 
  status?: TaskStatus;

}
