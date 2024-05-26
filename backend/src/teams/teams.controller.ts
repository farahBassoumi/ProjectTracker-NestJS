import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { SearchDto } from '../common/dto/search.dto';

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
  findAllInvitaions(@Param('id') id: string, @Query() searchDto: SearchDto) {
    return this.teamsService.findAllInvitations(id, searchDto);
  }
}
