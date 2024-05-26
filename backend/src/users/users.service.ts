import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }
}
