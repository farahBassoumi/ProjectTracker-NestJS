import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTeamDto } from 'src/teams/dto/create-team.dto';
import { CreateProgressDto } from 'src/progress/dto/create-progress.dto';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTeamDto)
  team = {} as CreateTeamDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProgressDto)
  progress = {} as CreateProgressDto;
}
