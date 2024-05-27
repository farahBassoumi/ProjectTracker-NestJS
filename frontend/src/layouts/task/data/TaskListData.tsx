import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { axiosInstance } from 'utils';
import { getUserIdFromToken } from 'utils/getuserid';

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

export const fetchTask = async (taskId = null) => {
  const url = `/tasks/${taskId}`;
  const response = await axiosInstance.get(url);
  console.log(response.data);
  return response.data;
};
