import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from 'src/members/enum/role.enum';

export const ROLE = 'Role';
export const Role = (role: RoleEnum = RoleEnum.Member) =>
  SetMetadata(ROLE, role);
