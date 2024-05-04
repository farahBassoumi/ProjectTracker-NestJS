import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService extends CrudService<Team> {
  constructor(
    @InjectRepository(Team)
    teamsRepository: Repository<Team>,
  ) {
    super(teamsRepository);
  }
}
