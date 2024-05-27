/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Images
import wavesWhite from 'assets/images/shapes/waves-white.svg';
import rocketWhite from 'assets/images/illustrations/rocket-white.png';

function ProjectDescription({ title, description }) {
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                {title}
              </SoftTypography>
              <SoftBox mb={6}>
                <SoftTypography variant="body2" color="text">
                  {description}
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ position: 'relative', ml: 'auto' }}>
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox
                component="img"
                src={rocketWhite}
                alt="rocket"
                width="100%"
                pt={3}
              />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default ProjectDescription;
