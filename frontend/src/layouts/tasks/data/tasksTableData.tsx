import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { axiosInstance } from 'utils';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftProgress from 'components/SoftProgress';
import { TaskDisplay } from 'interfaces/TaskDisplay';



const Action = () => {
  return (
    <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
      more_vert
    </Icon>
  );
};

export const fetchTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  console.log(response.data.data);
  return response.data.data;
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
    { name: 'assigned to', align: 'center' },
    { name: 'action', align: 'center' },
  ];

  const rows = tasksData.map((task: TaskDisplay) => ({
    task: [<Link to={`/tasks/${task.id}`}>{task.name}</Link>],
    status: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {task.status}
      </SoftTypography>
    ),
    assigned: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {task.assignedTo}
      </SoftTypography>
    ),
    action: <Action />,
  }));

  return { columns, rows };
};

export default tasksTableData;
