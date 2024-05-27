import { Type } from 'class-transformer';
import { EntityDto } from '../../common/dto/entity.dto';
import { ValidateNested, IsNotEmpty, Matches } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/members/enum/role.enum';

export class CreateInvitationDto {
  sender: User;

  @Type(() => EntityDto)
  @ValidateNested()
  @IsNotEmpty()
  receiver: EntityDto;

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
  role: Role;

  expirationDate: Date;
}
