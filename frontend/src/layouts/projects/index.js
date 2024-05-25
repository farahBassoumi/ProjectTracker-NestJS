

// @mui material components
import Card from "@mui/material/Card";
import axios from "axios";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import projectsTableData from "layouts/projects/data/projectsTableData";
import SoftButton from "components/SoftButton";

import { useState } from "react";
import SoftInput from "components/SoftInput";

function Tables() {
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [showForm, setShowForm] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAddProject = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    // Handle form submission here, e.g., send data to backend
    console.log("Project Title:", projectTitle);
    console.log("Project Description:", projectDescription);

    const handleSubmit = () => {
      // Create project object
      const newProject = {
        name: projectTitle,
        desciption: projectDescription,
      };
  
      // Send POST request to backend
      axios.post("http://localhost:3000/projects/", newProject)
        .then(response => {
          console.log("Project created successfully:", response.data);
          // Reset form fields and hide the form
          setProjectTitle("");
          setProjectDescription("");
          setShowForm(false);
        })
        .catch(error => {
          console.error("Error creating project:", error);
          // Handle error, if needed
        });
    };

    // Reset form fields and hide the form
    setProjectTitle("");
    setProjectDescription("");
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox display="flex" justifyContent="center" py={3}>
        <SoftButton
         onClick={handleAddProject}>
          Add a new project!
        </SoftButton>
        </SoftBox>
        {showForm && (
            <SoftBox>
              <SoftInput
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project Title"
              />
              <SoftInput
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Project Description"
              />
                    <SoftBox display="flex" justifyContent="center">
              <SoftButton onClick={handleSubmit}>Submit</SoftButton>
              </SoftBox>
        </SoftBox>
      )}
      <SoftBox py={3}>
        <SoftBox mb={3}>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">My Projects</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
