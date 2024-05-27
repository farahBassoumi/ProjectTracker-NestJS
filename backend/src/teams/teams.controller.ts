import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { SearchDto } from '../common/dto/search.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.teamsService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id, { members: true, project: true });
  }

  @Get(':id/invitations')
  findAllInvitations(@Param('id') id: string, @Query() searchDto: SearchDto) {
    return this.teamsService.findAllInvitations(id, searchDto);
  }

  @Get('members/:projectId')
  async findMembersByProjectId(@Param('projectId') projectId: string): Promise<User[]> {
    return this.teamsService.findMembersByProjectId(projectId);
  }
}
