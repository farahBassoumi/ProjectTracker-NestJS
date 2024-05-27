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
import { Member } from 'src/members/entities/member.entity';
import { Role } from 'src/members/enum/role.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @User() user: UserEntity) {
    createProjectDto.team.members = [
      {
        user,
        role: Role.Leader,
      } as Member,
    ];

    return this.projectsService.create(createProjectDto);
  }

  @Get('findProjectsByUserId/:id')
  userProjects(@Param('id') id: string) {
    return this.projectsService.findProjectsByUserId(id);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto, @User() user: UserEntity) {
    return this.projectsService.findAllByUser(searchDto, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id, {
      tasks: true,
      team: {
        members: true,
      },
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

  @Get(':id')
  computeProjectDetails(@Param('id') id: string) {
    return this.projectsService.computeProjectDetails(id);
  }
}
