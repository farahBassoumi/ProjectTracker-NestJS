import { User } from 'src/users/entities/user.entity';
import { AuthDto } from './auth.dto';

export class AccountDto {
  user: User;
  auth: AuthDto;
}
