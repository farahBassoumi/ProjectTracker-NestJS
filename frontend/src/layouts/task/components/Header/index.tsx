import { useState, useEffect } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TiArrowBack } from 'react-icons/ti';
import { VscCircleFilled } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { FcSms } from 'react-icons/fc';
import { MdDateRange } from 'react-icons/md';
import { LuReplace } from 'react-icons/lu';
// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

// Soft UI Dashboard React base styles
import breakpoints from 'assets/theme/base/breakpoints';

// Images
import curved0 from 'assets/images/curved-images/curved0.jpg';

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal');
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener('resize', handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({
            functions: { rgba, linearGradient },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6),
            )}, url(${curved0})`,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          overflow: 'hidden',
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: 'relative',
          mt: -25,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h4" fontWeight="medium">
                ASSIGNED TO <strong>ME</strong>
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item>
            <SoftTypography
              variant="h5"
              fontWeight="medium"
              borderLeft={1}
              borderColor={'#344767'}
            >
              &nbsp;&nbsp;
              <TiArrowBack /> Back TO WORK Items
            </SoftTypography>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: 'relative',
          mt: 5,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'max-content auto',
                gap: 2,
                mt: 2,
              }}
            >
              <IconContext.Provider
                value={{
                  color: 'blue',
                  size: 20,
                  className: 'global-class-name',
                }}
              >
                <SoftTypography variant="h5" fontWeight="medium">
                  State &nbsp;&nbsp;&nbsp;&nbsp;
                </SoftTypography>
              </IconContext.Provider>
              <SoftTypography variant="h4" fontWeight="medium">
                <VscCircleFilled />
                &nbsp;&nbsp;&nbsp;To Do
              </SoftTypography>
              <SoftTypography variant="h5" fontWeight="medium">
                Area
              </SoftTypography>
              <SoftTypography variant="h4" fontWeight="medium">
                <LuReplace />
                &nbsp;&nbsp;&nbsp;ProjectTracker/test
              </SoftTypography>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'max-content auto',
                gap: 3,
                mt: 3,
              }}
            >
              <IconContext.Provider
                value={{
                  color: 'blue',
                  size: 20,
                  className: 'global-class-name',
                }}
              >
                <SoftTypography variant="h5" fontWeight="medium">
                  Comments &nbsp;&nbsp;&nbsp;&nbsp;
                </SoftTypography>
              </IconContext.Provider>
              <SoftTypography variant="h4" fontWeight="medium">
                <FcSms />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0
              </SoftTypography>
              <SoftTypography variant="h5" fontWeight="medium">
                Due Date&nbsp;&nbsp;&nbsp;&nbsp;
              </SoftTypography>
              <SoftTypography variant="h4" fontWeight="medium">
                <MdDateRange />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6/28/2024
              </SoftTypography>
            </Box>
          </Grid>
          <Grid item ml={27} alignSelf="top" mt={-11}>
            <SoftTypography variant="h6" fontWeight="medium">
              Updated By Hedi:2 apr
            </SoftTypography>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
