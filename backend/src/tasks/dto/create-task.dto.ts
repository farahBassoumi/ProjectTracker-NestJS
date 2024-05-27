import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EntityDto } from '../../common/dto/entity.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
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
  dueDate: number;
}
