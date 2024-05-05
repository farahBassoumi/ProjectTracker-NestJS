import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService extends CrudService<Task> {
  constructor(
    @InjectRepository(Task)
    tasksRepository: Repository<Task>,
  ) {
    super(tasksRepository);
  }
}
