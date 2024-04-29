import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';

@Injectable()
export class EventsService extends CrudService<Progress> {
  constructor(
    @InjectRepository(Progress)
    progressesRepository: Repository<Progress>,
  ) {
    super(progressesRepository);
  }
}
