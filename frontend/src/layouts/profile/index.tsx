//@ts-nocheck
// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { AxiosInstance } from 'utils';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Footer from 'examples/Footer';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Footer from 'examples/Footer';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';

// Overview page components
import Header from 'layouts/profile/components/Header';
import Header from 'layouts/profile/components/Header';

// Data
import profilesListData from 'layouts/profile/data/profilesListData';
import { fetchProjects } from 'layouts/projects/data/projectsTableData';
// Images
import homeDecor1 from 'assets/images/home-decor-1.jpg';
import homeDecor2 from 'assets/images/home-decor-2.jpg';
import homeDecor3 from 'assets/images/home-decor-3.jpg';
import team1 from 'assets/images/team-1.jpg';
import team2 from 'assets/images/team-2.jpg';
import team3 from 'assets/images/team-3.jpg';
import team4 from 'assets/images/team-4.jpg';
import projectImage from 'assets/images/project.png';
//import Project from "layouts/profile/project.model.js";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';




function Overview() {
  const [projects, setProjects] = useState([]);
let userID='';
  useEffect(() => {
    userID = getUserIdFromToken();
    console.log('id ', userID);
    fetchprojects();
  }, []);

  
const fetchprojects = async () => {
      const result = fetchProjects(userID);
  console.log("result: ", result);
      result.then((result) => {
        setProjects(result);
      });

}



  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem('auth');
  
    if (!token) {
      return null;
    }
  
    try {
      const decodedToken = jwtDecode<any>(token); 
      userID=decodedToken.sub;
      return decodedToken.sub;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };







  const projectsTest = [
    {
      id: 1,
      name: 'Project One',
      description: 'Description for project one',
      startDate: new Date(2023, 0, 1),
      name: 'Project One',
      description: 'Description for project one',
      startDate: new Date(2023, 0, 1),
    },
    {
      id: 2,
      name: 'Project Two',
      description: 'Description for project two',
      startDate: new Date(2023, 1, 15),
      name: 'Project Two',
      description: 'Description for project two',
      startDate: new Date(2023, 1, 15),
    },
    {
      id: 3,
      name: 'Project Three',
      description: 'Description for project three',
      startDate: new Date(2023, 2, 20),
    }
  ];

  const authorsList = [
    [
      { image: team1, name: 'farah' },
      { image: team2, name: 'farah2' },
      { image: team3, name: 'Nick Daniel' },
      { image: team4, name: 'Peterson' },
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
            <SoftBox mb={1}>
              <SoftTypography
                variant="button"
                fontWeight="regular"
                color="text"
              >
              <SoftTypography
                variant="button"
                fontWeight="regular"
                color="text"
              >
                Architects design houses
              </SoftTypography>
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
                    title={project.projectName}
                    description={project.projectDescription}
                    status={project.status}
                    action={{
                      type: 'internal',
                      route: '/pages/profile/profile-overview',
                      color: 'info',
                      label: 'view project',
                      type: 'internal',
                      route: '/pages/profile/profile-overview',
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
