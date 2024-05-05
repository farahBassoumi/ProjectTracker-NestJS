import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { hash, verify } from 'argon2';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { password, ...data } = registerUserDto;

    const passwordHash = await this.hashPassword(password);

    const user: User = this.usersRepository.create({
      ...data,
      password: passwordHash,
    });

    return this.usersRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthDto> {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOneBy({ email });

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
    { password }: UpdateUserLoginDto,
  ): Promise<User> {
    const passwordHash = await this.hashPassword(password);

    const user = await this.usersRepository.preload({
      id,
      password: passwordHash,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersRepository.save(user);
  }
}
