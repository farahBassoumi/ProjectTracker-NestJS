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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchDto } from '../common/dto/search.dto';
import { User as UserDecorator } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { NotificationType } from 'src/notifications/enum/notification-type.enum';
import { EventType } from 'src/events/enums/event-type-enum';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly UsersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @UserDecorator() user: User,
  ) {
    let assignedToUser: User | undefined;
  if (createTaskDto.assignedTo && createTaskDto.assignedTo.id) {
    assignedToUser = await this.UsersService.findById(createTaskDto.assignedTo.id);
    if (!assignedToUser) {
      throw new NotFoundException(`User with ID ${createTaskDto.assignedTo.id} not found`);
    }
  }
    const res = await this.tasksService.create({
      ...createTaskDto,
      creator: user,
      assignedTo: ,
    });

    this.eventEmitter.emit(NotificationType.taskAssignment, {
      user: createTaskDto.assignedTo,
      type: NotificationType.taskAssignment,
      data: JSON.stringify(res),
    } as CreateNotificationDto);

    this.eventEmitter.emit(EventType.TaskCreated, {
      recipient: createTaskDto.project.id,
      data: createTaskDto,
    });

    return res;
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.tasksService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const oldTask = await this.tasksService.findOne(id);
    const res = await this.tasksService.update(id, updateTaskDto);

    if (oldTask.assignedTo != res.assignedTo) {
      this.eventEmitter.emit(NotificationType.taskReassignment, {
        user: oldTask.assignedTo,
        type: NotificationType.taskReassignment,
        data: JSON.stringify(oldTask),
      } as CreateNotificationDto);

      this.eventEmitter.emit(NotificationType.taskReassignment, {
        user: res.assignedTo,
        type: NotificationType.taskReassignment,
        data: JSON.stringify(res),
      } as CreateNotificationDto);
    }
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    this.eventEmitter.emit(NotificationType.taskDeletion, {
      user: task.assignedTo,
      type: NotificationType.taskDeletion,
      data: JSON.stringify(task),
    } as CreateNotificationDto);

    this.eventEmitter.emit(EventType.TaskRemoved, {
      description: `Task ${task.name}removed`,
      recipient: task.project.id,
      data: task,
    });

    return this.tasksService.remove(id);
  }
}
