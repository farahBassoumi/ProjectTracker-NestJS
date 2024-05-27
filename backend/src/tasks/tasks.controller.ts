import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchDto } from '../common/dto/search.dto';
import { User as UserDecorator } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from '../users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { NotificationType } from 'src/notifications/enum/notification-type.enum';
import { EventType } from 'src/events/enums/event-type-enum';
import { TaskStatus } from './enums/task-status.enum';
import { EventsService } from 'src/events/events.service';
import { CreateEventDto } from 'src/events/dto/create-event.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly UsersService: UsersService,
    private eventEmitter: EventEmitter2,
    private readonly eventService: EventsService,
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @UserDecorator() user: User,
  ) {
    let assignedToUser: User | undefined;
    if (createTaskDto.assignedTo && createTaskDto.assignedTo.id) {
      assignedToUser = await this.UsersService.findOne(
        createTaskDto.assignedTo.id,
      );
      console.log(assignedToUser);
      if (!assignedToUser) {
        throw new NotFoundException(
          `User with ID ${createTaskDto.assignedTo.id} not found`,
        );
      }
    }
    const dueDate = new Date();
    dueDate.setTime(dueDate.getTime() + createTaskDto.DueDate);

    const res = await this.tasksService.create({
      ...createTaskDto,
      dueDate : dueDate,
      creator: user,
      status: TaskStatus.TO_DO,
      assignedTo: assignedToUser,
    });

    const newEvent: CreateEventDto = {
      description: 'Task Created',
      type: EventType.TaskCreated,
      userId: user.id,
      projectId: createTaskDto.project.id,
    };

    await this.eventService.create(newEvent);

    this.eventEmitter.emit(NotificationType.taskAssignment, {
      user: createTaskDto.assignedTo,
      type: NotificationType.taskAssignment,
      data: res,
    } as CreateNotificationDto);

    this.eventEmitter.emit(EventType.TaskCreated, {
      description: `Task ${createTaskDto.name} added`,
      recipient: createTaskDto.project.id,
      data: createTaskDto,
    });

    return res;
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.tasksService.findAll(searchDto);
  }

  @Get('findAll')
  findAllTasks() {
    return this.tasksService.findAllTasks();
  }

  @Get('project/:projectId')
  findByProjectId(@Param('projectId') projectId: string) {
    return this.tasksService.findByProjectId(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id , { assignedTo: true, project: true ,comments: true});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const oldTask = await this.tasksService.findOne(id);
    const res = await this.tasksService.update(id, updateTaskDto);

    if (oldTask.assignedTo != res.assignedTo) {
      this.eventEmitter.emit(NotificationType.taskReassignment, {
        user: oldTask.assignedTo,
        type: NotificationType.taskReassignment,
        data: oldTask,
      } as CreateNotificationDto);

      this.eventEmitter.emit(NotificationType.taskReassignment, {
        user: res.assignedTo,
        type: NotificationType.taskReassignment,
        data: res,
      } as CreateNotificationDto);
    }

    if (res.status == TaskStatus.DONE) {
      this.eventEmitter.emit(EventType.TaskDone, {
        description: `Task ${res.name} completed`,
        recipient: res.project.id,
        data: res,
      });
    } else if (res.status == TaskStatus.IN_PROGRESS) {
      this.eventEmitter.emit(EventType.TaskStarted, {
        description: `Task ${res.name} is in progress`,
        recipient: res.project.id,
        data: res,
      });
    }
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    this.eventEmitter.emit(NotificationType.taskDeletion, {
      user: task.assignedTo,
      type: NotificationType.taskDeletion,
      data: task,
    } as CreateNotificationDto);

    this.eventEmitter.emit(EventType.TaskRemoved, {
      description: `Task ${task.name} removed`,
      recipient: task.project.id,
      data: task,
    });

    return this.tasksService.remove(id);
  }
}
