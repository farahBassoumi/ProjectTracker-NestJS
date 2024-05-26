//@ts-nocheck
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
//import Project from "layouts/profile/project.model.js";
import axios from 'axios';
import { useEffect, useState } from "react";
function Overview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);
  const projectsTest = [
    {
      id: 1,
      name: "Project One",
      description: "Description for project one",
      startDate: new Date(2023, 0, 1)
    },
    {
      id: 2,
      name: "Project Two",
      description: "Description for project two",
      startDate: new Date(2023, 1, 15)
    },
    {
      id: 3,
      name: "Project Three",
      description: "Description for project three",
      startDate: new Date(2023, 2, 20)
    }
  ];
  
  const images = [homeDecor1, homeDecor2, homeDecor3];
  const authorsList = [
    [
      { image: team1, name: "farah" },
      { image: team2, name: "farah2" },
      { image: team3, name: "Nick Daniel" },
      { image: team4, name: "Peterson" },
    ],
    [
      { image: team3, name: "Nick Daniel" },
      { image: team4, name: "Peterson" },
      { image: team1, name: "Elena Morison" },
      { image: team2, name: "Ryan Milly" },
    ],
    [
      { image: team4, name: "Peterson" },
      { image: team3, name: "Nick Daniel" },
      { image: team2, name: "Ryan Milly" },
      { image: team1, name: "Elena Morison" },
    ],
  ];
  //get data from back 
  
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
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {projectsTest.map((project, index) => (
                <Grid item xs={12} md={6} xl={4} key={project.id}>
                  <DefaultProjectCard
                    image={images[index % images.length]}
                    title={project.name}
                    description={project.description}
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "info",
                      label: "view project",
                    }}
                    authors={authorsList[index % authorsList.length]}
                  />
                </Grid>
              ))}
            </Grid>
            {/* <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>
         
            </Grid> */}
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
