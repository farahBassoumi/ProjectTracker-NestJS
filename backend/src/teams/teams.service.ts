import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InvitationsService } from 'src/invitations/invitations.service';
import { SearchDto } from 'src/common/dto/search.dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Invitation } from 'src/invitations/entities/invitation.entity';

@Injectable()
export class TeamsService extends CrudService<Team> {
  constructor(
    @InjectRepository(Team)
    teamsRepository: Repository<Team>,
    private readonly invitationsService: InvitationsService,
  ) {
    super(teamsRepository);
  }

  findAllInvitations(
    id: string,
    searchDto: SearchDto,
  ): Promise<Pagination<Invitation>> {
    return this.invitationsService.findAll(searchDto, { team: { id } });
  }
}
