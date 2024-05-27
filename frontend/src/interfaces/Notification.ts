import { Project } from 'layouts/profile/project.model';
import { User } from './User';

export enum NotificationType {
  projectInvitation = 'notification.project.invitaion',
  taskAssignment = 'notification.task.assignment',
  taskComment = 'notification.task.comment',
  taskDeletion = 'notification.task.deletion',
  taskReassignment = 'notification.task.reassignment',
}

export interface NotificationData {
  id: string;
  name?: string;
  project?: Project;
  [key: string]: any;
}

export interface Notification {
  id: string;
  type: NotificationType;
  user: User;
  data: NotificationData;
  createdAt: Date | string;
}
