import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class TaskListener {
  constructor(
    private notificationsService: NotificationsService,
    private readonly eventsService: EventsService,
  ) {}

  @OnEvent('notification.*.*')
  async persistNotification(payload: CreateNotificationDto) {
    const notif = await this.notificationsService.create(payload);
    this.notificationsService.notifyUser(notif);
  }

  @OnEvent('event.*')
  async persistEvnt(payload: any) {
    await this.eventsService.create(payload);
  }
}
