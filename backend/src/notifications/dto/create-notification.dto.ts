import { User } from '../../users/entities/user.entity';
import { NotificationType } from '../enum/notification-type.enum';

export class CreateNotificationDto {
  user: User;
  type: NotificationType;
  data: string;
}
