import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EntityDto } from '../../common/dto/entity.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsDefined()
  project: EntityDto;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsOptional()
  @IsDefined()
  assignedTo?: EntityDto;

  @IsNumber()
  DueDate: number;
}
