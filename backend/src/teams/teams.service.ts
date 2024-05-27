import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InvitationsService } from 'src/invitations/invitations.service';
import { SearchDto } from 'src/common/dto/search.dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Invitation } from 'src/invitations/entities/invitation.entity';
import { User } from 'src/users/entities/user.entity';

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

  async findMembersByProjectId(projectId: string): Promise<User[]> {
    const team = await this.repository.findOne({
      where: { project: { id: projectId } },
      relations: ['members', 'members.user'],
    });

    if (!team) {
      throw new NotFoundException(`Team for project ID ${projectId} not found`);
    }

    return team.members.map((member) => member.user);
  }
}
