import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService extends CrudService<Project> {
  constructor(
    @InjectRepository(Project)
    projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }
}
