import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';

@Injectable()
export class TaskListener {
  constructor(private notificationsService: NotificationsService) {}
  @OnEvent('**')
  async handleEverything(payload: CreateNotificationDto) {
    return this.notificationsService.create(payload);
  }
}
