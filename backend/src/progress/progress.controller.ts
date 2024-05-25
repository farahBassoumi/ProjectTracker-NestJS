import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { SearchDto } from '../common/dto/search.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.progressService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(id);
  }
}
