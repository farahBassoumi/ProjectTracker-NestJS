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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { notificationTypes } from '../notifications/entities/notification.entity';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @UserDecorator() user: User,
  ) {
    const res = await this.tasksService.create({
      ...createTaskDto,
      creator: user,
    });

    this.eventEmitter.emit(notificationTypes.TASK_ASSIGNMENT, {
      user: createTaskDto.assignedTo,
      type: notificationTypes.TASK_ASSIGNMENT,
    } as CreateNotificationDto);

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

    this.eventEmitter.emit(notificationTypes.TASK_REASSIGNMENT, {
      user: oldTask.assignedTo,
      type: notificationTypes.TASK_REASSIGNMENT,
    } as CreateNotificationDto);

    this.eventEmitter.emit(notificationTypes.TASK_REASSIGNMENT, {
      user: res.assignedTo,
      type: notificationTypes.TASK_REASSIGNMENT,
    } as CreateNotificationDto);

    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    this.eventEmitter.emit(notificationTypes.TASK_DELETION, {
      user: task.assignedTo,
      type: notificationTypes.TASK_DELETION,
    } as CreateNotificationDto);

    return this.tasksService.remove(id);
  }
}
