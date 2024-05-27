import { User } from './User';

export interface Notification {
  id: string;
  type: NotificationType;
  user: User;
  data: string;
  createdAt: Date;
}

export enum NotificationType {
  projectInvitation = 'notification.project.invitaion',
  taskAssignment = 'notification.task.assignment',
  taskComment = 'notification.task.comment',
  taskDeletion = 'notification.task.deletion',
  taskReassignment = 'notification.task.reassignment',
}
