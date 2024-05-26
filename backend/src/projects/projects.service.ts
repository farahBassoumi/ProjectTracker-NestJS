import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectCalculationDetails } from './dto/project-calculation-details.dto';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';
import { Pagination } from 'src/common/dto/pagination.dto';
import { SearchDto } from 'src/common/dto/search.dto';
import {
  ProjectDisplay,
  ProjectStatus,
} from './interfaces/project-display.interface';

@Injectable()
export class ProjectsService extends CrudService<Project> {
  constructor(
    @InjectRepository(Project)
    projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }

  async findAllByUser(
    searchDto: SearchDto,
    userId: string,
  ): Promise<Pagination<ProjectDisplay>> {
    const { data, count } = await super.findAll(
      searchDto,
      {
        team: { members: { userId } },
      },
      {
        tasks: true,
      },
    );

    return {
      data: data.map(({ tasks, ...data }) => {
        const [total, done] = tasks.reduce(
          ([total, done], { status }) => {
            switch (status) {
              case TaskStatus.DONE:
                return [total + 1, done + 1];

              case TaskStatus.REMOVED:
                return [total, done];

              default:
                return [total + 1, done];
            }
          },
          [0, 0],
        );

        let status: ProjectStatus;
        let completion: number;

        if (done === 0) {
          status = 'Not started';
          completion = 0;
        } else {
          status = total === done ? 'Done' : 'In progreess';
          completion = (done * 100) / total;
        }

        return {
          ...data,
          status,
          completion,
        };
      }),
      count,
    };
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
