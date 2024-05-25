/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

// Assuming you have components for Icon, SoftBox, SoftTypography, SoftProgress

const projectData = [
  {
    projectLogo: logoSpotify,
    projectName: "Spotify",
    status: "working",
    completion: 60, // Adjust completion values as needed
  },
  {
    projectLogo: null,
    projectName: "Invesion",
    status: "done",
    completion: 100,
  },
  // Add more project objects here
];

const formatCompletionColor = (completion) => {
  if (completion >= 100) {
    return "success";
  } else if (completion < 40) {
    return "error";
  } else {
    return "info";
  }
};

const Action = () => {
  // Assuming you have logic for the action icon, replace with your implementation
  return <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">more_vert</Icon>;
};

const projectsTableData = {
  columns: [
    { name: "project", align: "left" },
    { name: "status", align: "left" },
    { name: "completion", align: "center" },
    { name: "action", align: "center" },
  ],
  rows: projectData.map((project) => ({
    project: [project.projectName],
    status: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {project.status}
      </SoftTypography>
    ),
    completion: <Completion value={project.completion} color={formatCompletionColor(project.completion)} />,
    action: <Action />,
  })),
};

export default projectsTableData;

