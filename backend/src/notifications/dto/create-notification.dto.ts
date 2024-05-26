import { User } from '../../users/entities/user.entity';
import { notificationTypes } from '../entities/notification.entity';

export class CreateNotificationDto {
  type: notificationTypes;

  user: User;
}
