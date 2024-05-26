/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { axios } from 'utils';
import TeamTable from './components/TeamTable';
import { teams } from './components/data/exampleTeam';

const exampleProjects = teams;

export default function Team() {
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(exampleProjects);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* /////////////////////////////// tasks */}
        {/* <SoftBox mb={3}>
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
        </SoftBox> */}
        {/* /////////////////////////////// project title & members */}
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <ProjectDescription
                title={'project.name'}
                description={'project.description'}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ProjectMembers team={'project.team'} />
            </Grid>
          </Grid>
        </SoftBox> */}
        {teams.map((team) => (
          <SoftBox mb={3} key={team.projectId}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10} lg={12}>
                <TeamTable name={team.projectName} projectId={team.projectId} />
              </Grid>
            </Grid>
          </SoftBox>
        ))}

        {/* /////////////////////////////// charts */}
        {/* <SoftBox mb={3}>
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
        </SoftBox> */}
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}
