import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SearchDto } from '../common/dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { User } from 'src/auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.usersService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/projects')
  findProjects(
    @Param('id') id: string,
    @Query() searchDto: SearchDto,
    @User() user: UserEntity,
  ) {
    const isPublic = user.id !== id;

    return this.usersService.findProjectsByUser(searchDto, id, isPublic);
  }

  @Get(':id/projects/led')
  findProjectsLed(
    @Param('id') id: string,
    @Query() searchDto: SearchDto,
    @User() user: UserEntity,
  ) {
    const isPublic = user.id !== id;
    const isLeader = true;

    return this.usersService.findProjectsByUser(
      searchDto,
      id,
      isPublic,
      isLeader,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
