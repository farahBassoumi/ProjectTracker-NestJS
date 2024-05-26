// @mui material components
import Card from '@mui/material/Card';
import { axiosInstance } from 'utils';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Table from 'examples/Tables/Table';

// Data
import projectsTableData from 'layouts/projects/data/projectsTableData';
import SoftButton from 'components/SoftButton';

import { useState, useEffect } from 'react';
import SoftInput from 'components/SoftInput';
import { Project } from 'interfaces/Project';
import { TaskStatus } from 'interfaces/TaskStatus';
import { Invitation } from 'interfaces/Invitation';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError } from 'errors/UnauthorizedError';

function Tables() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [hasAddedProject, setHasAddedProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const navigate = useNavigate();

  const eventSource = new EventSource('http://localhost:3000/events/sse');

  eventSource.onmessage = function (event) {
    const eventData = JSON.parse(event.data);

    // Check if the received event is for the current project
    if (eventData.type !== null) {
      const newTask = eventData.data;
      // Handle the new task event, for example, update the UI
      console.log(newTask);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get(`/projects`);

      return response.data.data;
    }

    fetchData()
      .then((result) => {
        setProjects(result);
      })
      .catch((error) => {
        if (error instanceof UnauthorizedError) {
          navigate('/sign-in');
        }
      });
  }, [hasAddedProject]);

  const { columns: prCols, rows: prRows } = projectsTableData(projects);

  const handleAddProject = () => {
    setHasAddedProject(true);
    setShowForm(true);
  };

  useEffect(() => {
    getInvitations();
  }, []);

  //get invitations data from backend
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const getInvitations = () => {
    axiosInstance
      .get('/invitations')
      .then((response) => {
        console.log('Invitations fetched successfully:', response.data.data);
        setInvitations(response.data.data);
      })
      .catch((error) => {
        if (error instanceof UnauthorizedError) {
          navigate('/sign-in');
        }
      });
  };
  const handleSubmit = () => {
    // Handle form submission here, e.g., send data to backend
    console.log('Project Title:', projectTitle);
    console.log('Project Description:', projectDescription);

    // Create project object
    const newProject: Partial<Project> = {
      name: projectTitle,
      description: projectDescription,
    };

    // Send POST request to backend
    axiosInstance
      .post('/projects', newProject)
      .then((response) => {
        console.log('Project created successfully:', response.data);
        // Reset form fields and hide the form
        setProjectTitle('');
        setProjectDescription('');
        setShowForm(false);
        setHasAddedProject(!hasAddedProject);
      })
      .catch((error) => {
        console.error('Error creating project:', error);
        // Handle error, if needed
      });

    // Reset form fields and hide the form
    setProjectTitle('');
    setProjectDescription('');
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
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <SoftTypography variant="h6">My Projects</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              '& .MuiTableRow-root:not(:last-child)': {
                '& td': {
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

      <SoftBox mb={3} pb={3}>
        <Card pb={3}>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <SoftTypography variant="h6">Invitations</SoftTypography>
          </SoftBox>
          <SoftBox>
            {invitations.map((invitation, index) => (
              <div>
                <div
                  key={invitation.id}
                  style={{
                    padding: '10px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginRight: '10%',
                    marginLeft: '10%',
                  }}
                >
                  <div>{`from: ${invitation.sender.firstName} ${invitation.sender.lastName}`}</div>
                </div>
                <div
                  style={{
                    marginRight: '4%',
                    marginLeft: '4%',
                  }}
                >
                  {' '}
                  {index !== invitations.length - 1 && (
                    <hr
                      style={{
                        borderWidth: '1px',
                        borderColor: 'lightgrey',
                        opacity: 0.5,
                        margin: '8px 0',
                      }}
                    />
                  )}
                </div>
                <div style={{ height: '8px' }}></div>
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
