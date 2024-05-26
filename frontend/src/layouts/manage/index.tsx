/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import Grid from '@mui/material/Grid';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useEffect, useState } from 'react';
import TeamTable from './components/TeamTable';

//////////// test data
import { teams } from './components/data/exampleTeam';
const exampleProjects = teams;

export default function Manage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(exampleProjects);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {teams.map((team) => (
          <SoftBox mb={3} key={team.projectId}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10} lg={12}>
                <TeamTable name={team.projectName} projectId={team.projectId} />
              </Grid>
            </Grid>
          </SoftBox>
        ))}
      </SoftBox>
    </DashboardLayout>
  );
}
