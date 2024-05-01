import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserLoginDto extends PickType(RegisterUserDto, [
  'password',
] as const) {}
