import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService extends CrudService<Project> {
  constructor(
    @InjectRepository(Project)
    projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }

  async findProjectsByUserId(userId: string): Promise<DeepPartial<Project>[]> {
    const projects = await this.repository.find({
      relations: ['teams', 'teams.members'],
    });

    // Filter projects where the user is a member of any team
    const projectsWithUser = projects.filter((project) =>
      project.team.members.some((member) => member.userId === userId),
    );

    const projectsWithUserIdsInfo = projectsWithUser.map((project) => ({
      projectId: project.id,
      projectName: project.name,
      progress: project.progress, // Assuming `progress` is a field in the project object
    }));
    return projectsWithUserIdsInfo;
  }
}
