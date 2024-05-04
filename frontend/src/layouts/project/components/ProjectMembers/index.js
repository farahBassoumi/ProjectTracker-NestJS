

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import done from "assets/images/small-logos/done.svg";
import SoftAvatar from "components/SoftAvatar";

function ProjectMembers() {
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox height="100%" p={2}>
        <SoftBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}`,
            backgroundSize: "cover",
          }}
        >
          <SoftBox mb={3} pt={1}>
            <SoftTypography variant="h5" color="white" fontWeight="bold">
              Project Members
            </SoftTypography>
          </SoftBox>
          <SoftBox>
            <Grid container spacing={3} display="flex" flexDirection="row">
              <Grid item xs={12} sm={6} xl={3} display="flex">
                <SoftAvatar src = {done}/>
                <SoftAvatar src = {done}/>
                <SoftAvatar src = {done}/>
                <SoftAvatar src = {done}/>
              </Grid>
            </Grid>
          </SoftBox>
          <SoftTypography
            component="a"
            href="#"
            variant="button"
            color="white"
            fontWeight="medium"
            sx={{
              mt: "auto",
              mr: "auto",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            View All
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ProjectMembers;
