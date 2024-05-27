import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './decorators/public.decorator';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { User } from './user.decorator';
import { User as UserEntity } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AccountDto } from './dto/account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() registerUserDto: RegisterUserDto): Promise<AccountDto> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @Public()
  login(@Body() loginUserDto: LoginUserDto): Promise<AccountDto> {
    return this.authService.login(loginUserDto);
  }

  @Post('logout')
  logout(@Body() refreshDto: RefreshDto): Promise<void> {
    return this.authService.logout(refreshDto);
  }

  @Post('disconnect')
  disconnect(@User() user: UserEntity): Promise<void> {
    return this.authService.disconnect(user);
  }

  @Post('refresh')
  @Public()
  refresh(@Body() refreshDto: RefreshDto): Promise<AuthDto> {
    return this.authService.refresh(refreshDto);
  }

  @Patch('update-login')
  updateLogin(
    @Body() updateUserLoginDto: UpdateUserLoginDto,
    @User() { id }: UserEntity,
  ): Promise<AuthDto> {
    return this.authService.updateLogin(id, updateUserLoginDto);
  }
}
