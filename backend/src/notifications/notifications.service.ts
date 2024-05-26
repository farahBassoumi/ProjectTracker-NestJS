import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService extends CrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    notificationsRepository: Repository<Notification>,

    private readonly notificationsGateway: NotificationsGateway,
  ) {
    super(notificationsRepository);
  }
  notifyUser(notification: Notification) {
    this.notificationsGateway.notifyUser(notification);
    return notification;
  }
}
