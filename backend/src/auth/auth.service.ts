import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { hash, verify } from 'argon2';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { CrudService } from '../common/crud/crud.service';

@Injectable()
export class AuthService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    super(usersRepository);
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { password } = registerUserDto;
    registerUserDto.password = await this.hashPassword(password);

    return super.create(registerUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthDto> {
    const { email, password } = loginUserDto;

    const user = await this.repository.findOneBy({ email });

    if (!user || !(await verify(user.password, password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async updateLogin(
    id: string,
    updateUserLoginDto: UpdateUserLoginDto,
  ): Promise<User> {
    const { password } = updateUserLoginDto;
    updateUserLoginDto.password = await this.hashPassword(password);

    return super.update(id, updateUserLoginDto);
  }
}
