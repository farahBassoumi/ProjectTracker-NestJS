/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftProgress from 'components/SoftProgress';
import React from 'react';
import { ProjectDisplay } from 'interfaces/ProjectDisplay';

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

const ProjectsTableData = (projectsData) => {
  console.log(projectsData);
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

  const rows = projectsData.map((project: ProjectDisplay) => ({
    project: [<Link to={`/project/${project.id}`}>{project.name}</Link>],
    status: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {project.status}
      </SoftTypography>
    ),
    completion: (
      <Completion
        value={project.completion}
        color={formatCompletionColor(project.completion)}
      />
    ),
    action: <Action />,
  }));

  return { columns, rows };
};

export default ProjectsTableData;
