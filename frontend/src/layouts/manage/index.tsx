// @ts-nocheck
import Grid from '@mui/material/Grid';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useEffect, useState } from 'react';
import TeamTable from './components/TeamTable';
import { axiosInstance, user as getUser } from '../../utils';
import { Project } from 'interfaces/Project';
import { jwtDecode } from 'jwt-decode';

export default function Manage() {
  const [teams, setTeams] = useState<Project[]>([]);
  const [projects, setProjects] = useState([]);
  const user = getUser();

  const fetchProjects = async () => {
    const result = await axiosInstance.get(`/users/${user.id}/projects/led`);

    console.log('result: ', result.data);
    console.log('result.data.data: ', result.data.data);
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
      console.error('Failed             to  decode token:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchProjects();
    setTeams(projects);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {teams.map((team, key) => (
          <SoftBox mb={3} key={team.id}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10} lg={12}>
                <div> {team.data}  </div>
                <TeamTable team={team } name={team.name} projectId={team.id} key={key}/>
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
