//@ts-nocheck
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Icon from '@mui/material/Icon';
import { axios } from 'utils';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftProgress from 'components/SoftProgress';
import React from "react";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress
          value={value}
          color={color}
          variant="gradient"
          label={false}
        />
      </SoftBox>
    </SoftBox>
  );
}

const Action = () => {
  return (
    <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
      more_vert
    </Icon>
  );
};

const ProjectsTableData = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userId = 'your-user-id'; // Replace with the actual user ID
        const response = await axios.get(`/findProjectsByUserId/${userId}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const formatCompletionColor = (completion) => {
    if (completion >= 100) {
      return 'success';
    } else if (completion < 40) {
      return 'error';
    } else {
      return 'info';
    }
  };

  const columns = [
    { name: 'project', align: 'left' },
    { name: 'status', align: 'left' },
    { name: 'completion', align: 'center' },
    { name: 'action', align: 'center' },
  ];

  const rows = projectData.map((project: any) => ({
    project: [project.projectName],
    status: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {project.progress.status}
      </SoftTypography>
    ),
    completion: (
      <Completion
        value={project.progress.completion}
        color={formatCompletionColor(project.progress.completion)}
      />
    ),
    action: <Action />,
  }));

  return { columns, rows };
};

export default ProjectsTableData;