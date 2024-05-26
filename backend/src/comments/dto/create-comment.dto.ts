import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EntityDto } from '../../common/dto/entity.dto';
import { User } from '../../users/entities/user.entity';

export class CreateCommentDto {
  @IsEmpty()
  @IsOptional()
  user: User;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  task: EntityDto;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  @IsOptional()
  repliesTo?: EntityDto;
}
