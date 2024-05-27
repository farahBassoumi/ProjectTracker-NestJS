/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import Grid from '@mui/material/Grid';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useEffect, useState } from 'react';
import TeamTable from './components/TeamTable';
import { axiosInstance } from '../../utils';
//////////// test data
import { teams } from './components/data/exampleTeam';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const exampleProjects = teams;

export default function Manage() {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const userId = getUserIdFromToken();
    const result = await axiosInstance.get(
      `/projects/findProjectsByLeader/${userId}`,
    );
    console.log('result: ', result.data);
    setProjects(result.data);
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

  useEffect(() => {
    fetchProjects();
    setTeams(projects);
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {teams.map((team, key) => (
          <SoftBox mb={3} key={team.id}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10} lg={12}>
                <TeamTable name={team.name} projectId={team.id} key={key}/>
              </Grid>
            </Grid>
          </SoftBox>
        ))}
      </SoftBox>

      {/* <SoftBox py={3}>
        {projects.map((project) => (
          <SoftBox mb={3} key={project.id}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={10} lg={12}>
                <TeamTable name={project.name} projectId={project.id}  />

              </Grid>
            </Grid>
          </SoftBox> */}
    </DashboardLayout>
  );
}
