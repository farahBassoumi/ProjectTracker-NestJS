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
    return this.teamsService.findOne(id);
  }
}
