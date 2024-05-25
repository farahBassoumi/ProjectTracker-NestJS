import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SearchDto } from '../common/dto/search.dto';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '../users/entities/user.entity';
import { Member } from 'src/teams/entities/member.entity';
import { Role } from 'src/teams/enum/role.enum';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @User() user: UserEntity) {
    createProjectDto.team.members = [
      {
        user,
        role: Role.leader,
      } as Member,
    ];

    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.projectsService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id, {
      tasks: true,
      team: true,
      progress: true,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
