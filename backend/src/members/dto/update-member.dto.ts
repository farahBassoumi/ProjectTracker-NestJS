import { Matches } from 'class-validator';
import { Role } from '../enum/role.enum';

export class UpdateMemberDto {
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
}
