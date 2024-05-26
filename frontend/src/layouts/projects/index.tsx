//@ts-nocheck
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

import { useState,useEffect } from "react";
import SoftInput from "components/SoftInput";
import { TaskStatus } from "interfaces/TaskStatus";
import { Padding } from "@mui/icons-material";

function Tables() {
  const { columns: prCols, rows: prRows } = projectsTableData;

  const [showForm, setShowForm] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAddProject = () => {
    console.log(TaskStatus.DONE);
    setShowForm(true);
  };

 


useEffect(() => {
  getInvitations();
}, []);

    //get invitations data from backend
 const [invitations, setInvitations] = useState([]); 
const getInvitations = () => {
    axios.get('http://localhost:3000/invitations/')
      .then(response => {
        console.log('Invitations fetched successfully:', response.data);
        setInvitations(response.data);
      })
      .catch(error => {
        console.error('Error fetching invitations:', error);
      });
}
  const handleSubmit = () => {
    // Handle form submission here, e.g., send data to backend
    console.log("Project Title:", projectTitle);
    console.log("Project Description:", projectDescription);

    // Create project object
    const newProject = {
      name: projectTitle,
      desciption: projectDescription,
    };
  
    // Send POST request to backend
    axios
      .post("http://localhost:3000/projects/", newProject)
      .then((response) => {
        console.log("Project created successfully:", response.data);
        // Reset form fields and hide the form
        setProjectTitle("");
        setProjectDescription("");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        // Handle error, if needed
      });

    // Reset form fields and hide the form
    setProjectTitle("");
    setProjectDescription("");
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox display="flex" justifyContent="center" py={3}>
        <SoftButton onClick={handleAddProject}>Add a new project!</SoftButton>
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
        <SoftBox mb={3}></SoftBox>
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

      <SoftBox mb={3} pb={3} >
        <Card pb={3}>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Invitations</SoftTypography>
          </SoftBox>
          <SoftBox >
            {invitations.map((invitation, index) => (
              <div >
                <div
                  key={invitation.id}
                  style={{
                    padding:'10px',
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginRight: "10%",
                    marginLeft: "10%",
                  }}
                >
                  <div>{invitation.name}</div>

                  <div>{invitation.sender}</div>
                </div>
                <div
                  style={{
                    marginRight: "4%",
                    marginLeft: "4%",
                  }}
                >
                  {" "}
                  {index !== invitations.length - 1 && (
                    <hr
                      style={{
                        borderWidth: "1px",
                        borderColor: "lightgrey",
                        opacity: 0.5,
                        margin: "8px 0",
                      }}
                    />
                  )}
                </div>
                <div style={{height:'8px'}}></div>
              </div>
            ))}
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
