import { IsEmpty, IsOptional } from 'class-validator';
import { Member } from '../entities/member.entity';

export class CreateTeamDto {
  @IsEmpty()
  @IsOptional()
  members: Member[];
}
