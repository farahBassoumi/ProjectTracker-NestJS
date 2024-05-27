import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskListener } from './task.listener';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), EventsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, TaskListener],
})
export class TasksModule {}
