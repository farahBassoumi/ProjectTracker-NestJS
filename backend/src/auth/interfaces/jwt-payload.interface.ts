import { TokenType } from '../enum/token-type.enum';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  type: TokenType;
}
