import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { hash, verify } from 'argon2';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { CrudService } from '../common/crud/crud.service';
import { TokenType } from './enum/token-type.enum';
import { RefreshDto } from './dto/refresh.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Auth } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AuthService extends CrudService<Auth> {
  constructor(
    @InjectRepository(Auth)
    authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super(authRepository);
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password);
  }

  async register(registerUserDto: RegisterUserDto): Promise<AccountDto> {
    const { password } = registerUserDto;
    registerUserDto.password = await this.hashPassword(password);

    const user = await this.usersService.create(registerUserDto);

    const tokens = this.generateTokens(user);

    console.log("here");

    await super.create({ user, refreshToken: tokens.refreshToken });

    return {
      user,
      auth: tokens,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<AccountDto> {
    console.log('loginUserDto: ');
    const { email, password } = loginUserDto;
    console.log('loginUserDto: ', loginUserDto);
if(!email || !password) alert('Please enter email and password');
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await verify(user.password, password))) {
      throw new UnauthorizedException();
    }

    const tokens = this.generateTokens(user);

    await super.create({ user, refreshToken: tokens.refreshToken });

    return {
      user,
      auth: tokens,
    };
  }

  async logout({ refreshToken }: RefreshDto) {
    await this.repository.delete({ refreshToken });
  }

  async disconnect({ id }: User) {
    await this.repository.delete({
      user: {
        id,
      },
    });
  }

  async updateLogin(
    id: string,
    updateUserLoginDto: UpdateUserLoginDto,
  ): Promise<AuthDto> {
    const { password } = updateUserLoginDto;
    updateUserLoginDto.password = await this.hashPassword(password);

    const user = await this.usersService.update(id, updateUserLoginDto);

    await this.disconnect(user);

    return this.generateTokens(user);
  }

  async refresh({ refreshToken }: RefreshDto): Promise<AuthDto> {
    try {
      const auth = await this.repository.findOneBy({ refreshToken });

      if (!auth) {
        throw new BadRequestException();
      }

      let payload: Omit<JwtPayload, 'type'>;

      try {
        const { type: _type, ...payload_ }: JwtPayload = this.jwtService.verify(
          refreshToken,
          {
            ignoreExpiration: false,
          },
        );

        payload = payload_;
      } catch {
        await super.remove(auth.id);
        throw new BadRequestException();
      }

      const tokens = this.generateTokens(payload);

      auth.refreshToken = tokens.refreshToken;

      await this.repository.save(auth);

      return tokens;
    } catch {
      throw new BadRequestException();
    }
  }

  private generateTokens({ id, username, email }: DeepPartial<User>): AuthDto {
    const payload: Omit<JwtPayload, 'type'> = {
      sub: id,
      username,
      email,
    };

    return {
      refreshToken: this.jwtService.sign(
        {
          ...payload,
          type: TokenType.Refresh,
        },
        {
          expiresIn: '60d',
        },
      ),
      accessToken: this.jwtService.sign(
        {
          ...payload,
          type: TokenType.Access,
        },
        {
          expiresIn: '1h',
        },
      ),
    };
  }
}
