import { Type } from 'class-transformer';
import { EntityDto } from '../../common/dto/entity.dto';
import {
  ValidateNested,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/members/enum/role.enum';
import { EmailDto } from 'src/common/dto/email.dto';

export class CreateInvitationDto {
  sender: User;

  @Type(() => EmailDto)
  @ValidateNested()
  @IsNotEmpty()
  receiver: EmailDto;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  team: EntityDto;

  @Matches(
    `^${Object.values(Role)
      .filter((value) => value != Role.Leader)
      .join('|')}$`,
    '',
    {
      message: `The role must be either ${Role.SubLeader} or ${Role.Member}.`,
    },
  )
  @IsOptional()
  role: Role;

  expirationDate: Date;
}
