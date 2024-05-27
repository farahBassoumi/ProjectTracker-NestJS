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
import { jwtDecode } from 'jwt-decode';

const Action = () => {
  return (
    <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
      more_vert
    </Icon>
  );
};

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('auth');

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<any>(token);
    return decodedToken.sub;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const fetchTasks = async (projectId = null) => {
  const url = `/tasks/project/${projectId}`
  const response = await axiosInstance.get(url);  
  console.log(response.data);
  return response.data;
};

export const fetchProjects = async () => {
  const response = await axiosInstance.get(`/projects/findProjectsByUserId/${getUserIdFromToken()}`);
  console.log(response.data);
  return response.data;
};

export const fetchTeamMembers = async (projectId = null) => {
  const response = await axiosInstance.get(`/teams/members/${projectId}`);
  console.log('salem');
  console.log(response.data);
  return response.data;
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
        {task.assignedTo ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}` : 'Unassigned'}
      </SoftTypography>
    ),
    action: <Action />,
  }));

  return { columns, rows };
};

export default tasksTableData;
