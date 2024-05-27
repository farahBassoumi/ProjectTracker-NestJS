import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { axiosInstance } from 'utils';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftProgress from 'components/SoftProgress';
import { TaskDisplay } from 'interfaces/TaskDisplay';
import { getStatusText } from 'utils/taskStatusMapping';

const Action = () => {
  return (
    <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
      more_vert
    </Icon>
  );
};

export const fetchTasks = async (projectId = null) => {
  const url = projectId ? `/tasks/project/${projectId}` : '/tasks/findAll';
  const response = await axiosInstance.get(url);
  console.log(response.data);
  return response.data;
};

export const fetchProjects = async () => {
  const response = await axiosInstance.get('/projects');
  return response.data.data;
};

export const fetchTeamMembers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data.data;
};

const tasksTableData = (tasksData) => {
  const columns = [
    { name: 'task', align: 'left' },
    { name: 'status', align: 'left' },
    { name: 'assigned_to', align: 'center' },
    { name: 'action', align: 'center' },
  ];

  const rows = tasksData.map((task: TaskDisplay) => ({
    task: [<Link to={`/tasks/${task.id}`}>{task.name}</Link>],
    status: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {getStatusText(Number(task.status))}
      </SoftTypography>
    ),
    assigned_to: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {task.assignedTo
          ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
          : 'Unassigned'}
      </SoftTypography>
    ),
    action: <Action />,
  }));

  return { columns, rows };
};

export default tasksTableData;
