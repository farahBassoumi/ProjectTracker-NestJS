import { TaskStatus } from 'interfaces/TaskStatus';

export const taskStatusMap = {
  0: 'Done',
  1: 'IN_PROGRESS',
  2: 'Removed',
  3: 'TO_DO',
};

export const getStatusText = (statusIndex: number): string => {
  return taskStatusMap[statusIndex] || 'Unknown Status';
};
