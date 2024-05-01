import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './public.decorator';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { User } from './user.decorator';
import { User as UserType } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @Public()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch('update-login')
  updateLogin(
    @Body() updateUserLoginDto: UpdateUserLoginDto,
    @User() { id }: UserType,
  ) {
    return this.authService.updateLogin(id, updateUserLoginDto);
  }
}
