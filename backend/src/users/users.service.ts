import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SearchDto } from 'src/common/dto/search.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
    private readonly projectsService: ProjectsService,
  ) {
    super(usersRepository);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  findPublicProjects(
    id: string,
    searchDto: SearchDto,
  ): Promise<Pagination<Project>> {
    return this.projectsService.findAll(searchDto, {
      team: {
        members: {
          userId: id,
        },
      },
      isPublic: true,
    });
  }
}
