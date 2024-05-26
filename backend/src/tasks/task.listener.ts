import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';

@Injectable()
export class TaskListener {
  constructor(private notificationsService: NotificationsService) {}
  @OnEvent('**')
  async persistNotification(payload: CreateNotificationDto) {
    const notif = await this.notificationsService.create(payload);
    console.log(notif);
    this.notificationsService.notifyUser(notif);
  }
}
