import { IsEmpty, IsOptional } from 'class-validator';
import { Member } from '../../members/entities/member.entity';

export class CreateTeamDto {
  @IsEmpty()
  @IsOptional()
  members: Member[];
}
