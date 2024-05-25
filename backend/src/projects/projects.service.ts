import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectCalculationDetails } from './dto/project-calculation-details.dto';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';

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

  async computeProjectDetails(
    projectId: string,
  ): Promise<ProjectCalculationDetails> {
    // Fetch tasks associated with the project
    const project = await this.repository.findOne({ where: { id: projectId } });
    const tasks = project.tasks;
    // Calculate statistics
    const totalTasks = tasks.length;

    const tasksToDo = tasks.filter(
      (task) => task.status === TaskStatus.TO_DO,
    ).length;

    const tasksInProgress = tasks.filter(
      (task) => task.status === TaskStatus.IN_PROGRESS,
    ).length;

    const tasksDone = tasks.filter(
      (task) => task.status === TaskStatus.DONE,
    ).length;

    // Return the project calculation details
    return {
      totalTasks,
      tasksToDo,
      tasksInProgress,
      tasksDone,
    };
  }
}
