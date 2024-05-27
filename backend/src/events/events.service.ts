import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
@Injectable()
export class EventsService extends CrudService<Event> {
  constructor(
    @InjectRepository(Event)
    eventsRepository: Repository<Event>,
  ) {
    super(eventsRepository);
  }

  async findByProjectId(projectId: string) {
    return this.repository.find({ where: { id: projectId as any } });
  }
}
