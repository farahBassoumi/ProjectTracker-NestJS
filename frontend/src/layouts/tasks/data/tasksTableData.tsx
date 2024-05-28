import React, { useState ,useEffect} from 'react';
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
import { Menu, MenuItem } from '@mui/material';
import {getUserIdFromToken} from 'utils/getuserid';




export const fetchTasks = async (projectId = null) => {
  const url = `/tasks/project/${projectId}`;
  const response = await axiosInstance.get(url);
  console.log(response.data);
  return response.data;
};

export const fetchProjects = async () => {
  const response = await axiosInstance.get(
    `/projects/findProjectsByUserId/${getUserIdFromToken()}`,
  );
  console.log(response.data);
  return response.data;
};

export const fetchTeamMembers = async (projectId = null) => {
  const response = await axiosInstance.get(`/teams/members/${projectId}`);
  console.log('salem');
  console.log(response.data);
  return response.data;
};



