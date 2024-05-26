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

  async findProjectsByUserId(userId: string): Promise<DeepPartial<object>[]> {
    // Fetch projects with teams and members
    const projects = await this.repository.find({
      relations: ['team', 'team.members', 'tasks'],
    });

    // Filter projects where the user is a member
    const projectsWithUser = projects.filter((project) =>
      project.team.members.some((member) => member.userId === userId),
    );

    // Map project details with completion ratio and status
    const projectsWithUserDetails = await Promise.all(
      projectsWithUser.map(async (project) => {
        // Calculate completion ratio
        const totalTasks = project.tasks.length;
        const tasksDone = project.tasks.filter(
          (task) => task.status === TaskStatus.DONE,
        ).length;
        const completion = totalTasks > 0 ? (tasksDone / totalTasks) * 100 : 0;

        // Determine project status
        let status;
        if (tasksDone === 0) {
          status = 'Not Started';
        } else if (tasksDone === totalTasks) {
          status = 'Done';
        } else {
          status = 'In Progress';
        }

        return {
          projectId: project.id,
          projectName: project.name,
          completion,
          status,
        };
      }),
    );

    return projectsWithUserDetails;
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
