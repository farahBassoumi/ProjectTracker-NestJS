// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// @mui icons

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Footer from 'examples/Footer';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';

// Overview page components
import Header from 'layouts/profile/components/Header';

// Data
// import profilesListData from 'layouts/profile/data/profilesListData';
// import { fetchProjects } from 'layouts/projects/data/projectsTableData';
// Images

import team1 from 'assets/images/team-1.jpg';
import team2 from 'assets/images/team-2.jpg';
import team3 from 'assets/images/team-3.jpg';
import team4 from 'assets/images/team-4.jpg';
import projectImage from 'assets/images/project.png';
//import Project from "layouts/profile/project.model.js";
import { useEffect, useState } from 'react';
import { axiosInstance, handleError } from 'utils';
import { useNavigate } from 'react-router-dom';
import { ProjectDisplay } from 'interfaces/ProjectDisplay';

function Overview() {
  const [projects, setProjects] = useState<ProjectDisplay[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get(`/projects`);
      return response.data.data;
    }

    fetchData()
      .then((result) => {
        setProjects(result);
      })
      .catch((error) => {
        handleError(error, navigate);
      });
  }, []);

  const authorsList = [
    [
      { image: team1, name: 'farah' },
      { image: team2, name: 'farah2' },
      { image: team3, name: 'Nick Daniel' },
      { image: team4, name: 'Peterson' },
    ],
    [
      { image: team3, name: 'Nick Daniel' },
      { image: team4, name: 'Peterson' },
      { image: team1, name: 'Elena Morison' },
      { image: team2, name: 'Ryan Milly' },
    ],
    [
      { image: team4, name: 'Peterson' },
      { image: team3, name: 'Nick Daniel' },
      { image: team2, name: 'Ryan Milly' },
      { image: team1, name: 'Elena Morison' },
    ],
  ];

  return (
    <DashboardLayout>
      <Header />

      <SoftBox mt={5} mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Projects
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {projects.map((project, index) => (
                <Grid item xs={12} md={6} xl={4} key={project.id}>
                  <DefaultProjectCard
                    key={project.id}
                    image={projectImage}
                    title={project.name}
                    description={project.description}
                    status={project.status}
                    action={{
                      type: 'internal',
                      route: `/project/${project.id}`,
                      color: 'info',
                      label: 'view project',
                    }}
                    authors={authorsList[index % authorsList.length]}
                  />
                </Grid>
              ))}
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
