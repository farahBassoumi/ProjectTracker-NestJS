import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    @Get()
    async getAllUsers():Promise<User>  {
        let u= new User();
        u.name="farah";
        return await u;
    }

  

    @Post()
    createUser(@Body() createUserinput: User) {
      console.log(createUserinput);
    }

    // @Put(':id')
    // updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.updateUser(id, updateUserDto);
    // }

    // @Delete(':id')
    // deleteUser(@Param('id') id: string) {
    //     return this.userRepository.deleteUser(id);
    // }
}