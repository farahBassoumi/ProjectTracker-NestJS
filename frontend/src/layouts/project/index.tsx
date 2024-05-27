//@ts-nocheck
// @mui material components
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';

// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography';

// Dashboard layout components
import ProjectDescription from 'layouts/project/components/ProjectDescription';
import ProjectMembers from 'layouts/project/components/ProjectMembers';
import Events from 'layouts/project/components/Events';

// Data
import reportsBarChartData from 'layouts/project/data/reportsBarChartData';
import gradientLineChartData from 'layouts/project/data/gradientLineChartData';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils';

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const { projectId } = useParams(); // Get the project ID from the URL params
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch project data from the backend
    const fetchProject = async () => {
      const response = await axiosInstance.get(`/projects/${projectId}`);
      setProject(response.data);
      console.log(project);
    };

    fetchProject();
  }, []); // Fetch project data whenever the project ID changes

  if (!project) {
    // Render loading state or return null if no project data is available
    return null;
  }

  console.log(project);
  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'Total Tasks' }}
                count="150"
                icon={{ color: 'info', component: 'list' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'Done' }}
                count="70"
                icon={{ color: 'success', component: 'checkmark' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'In Progress' }}
                count="30"
                icon={{ color: 'warning', component: 'publishedWithChanges' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: 'To Do' }}
                icon={{ color: 'info', component: 'pending' }}
                count="50"
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <ProjectDescription
                title={project.name}
                description={project.description}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ProjectMembers team={project.team} />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={10} lg={12}>
              <Events />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox
                      fontSize={size.lg}
                      color="success"
                      mb={0.3}
                      mr={0.5}
                      lineHeight={0}
                    >
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography
                      variant="button"
                      color="text"
                      fontWeight="medium"
                    >
                      4% more{' '}
                      <SoftTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
