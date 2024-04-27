import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
   
 
}