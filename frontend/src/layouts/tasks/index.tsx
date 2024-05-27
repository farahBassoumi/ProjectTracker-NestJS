import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { axiosInstance, handleError } from 'utils';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Table from 'examples/Tables/Table';

// Data
import tasksTableData, {
  fetchTasks,
  fetchProjects,
  fetchTeamMembers,
} from 'layouts/tasks/data/tasksTableData';
import { UnauthorizedError } from 'errors/UnauthorizedError';

function Tasks() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [hours, setHours] = useState();
  const [days, setDays] = useState();
  const { projectId } = useParams(); // Get projectId from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResult = await fetchTasks(projectId); // Pass projectId to fetchTasks
        const projectsResult = await fetchProjects();
        console.log('tasks:', tasksResult);
        const teamMembersResult = await fetchTeamMembers(projectId);
        console.log('teamMembers:', teamMembersResult);
        setTasks(tasksResult);
        setProjects(projectsResult);
        setTeamMembers(teamMembersResult);
      } catch (error) {
        handleError(error, navigate);
      }
    };
    fetchData();
  }, []);

  console.log('ts:', tasks);
  const { columns: taskCols, rows: taskRows } = tasksTableData(tasks);

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setTaskTitle('');
    setTaskDescription('');
    setSelectedProject('');
    setAssignedTo('');
    setHours(0);
    setDays(0);
  };

  const handleSubmit = () => {
    const hoursInMilliseconds = hours ? hours * 60 * 60 * 1000 : 0;
    const daysInMilliseconds = days ? days * 24 * 60 * 60 * 1000 : 0;
    const deadlineInMilliseconds = hoursInMilliseconds + daysInMilliseconds;

    // Create task object
    const newTask = {
      name: taskTitle,
      description: taskDescription,
      project: { id: selectedProject }, // Wrap projectId in an object as required by DTO
      assignedTo: assignedTo ? { id: assignedTo } : undefined,
      DueDate: deadlineInMilliseconds,
    };

    // Send POST request to backend
    axiosInstance
      .post('/tasks', newTask)
      .then((response) => {
        console.log('Task created successfully:', response.data); // Check response structure here
        if (response.data) {
          setTasks([...tasks, response.data]);
          handleClose();
        } else {
          console.error('Unexpected response structure:', response);
        }
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        // Handle error, if needed
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox display="flex" justifyContent="center" py={3}>
        <SoftButton onClick={handleAddTask}>Add a new task!</SoftButton>
      </SoftBox>
      <Dialog open={showForm} onClose={handleClose}>
        <DialogTitle>Add a New Task</DialogTitle>
        <DialogContent>
          <SoftInput
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
            fullWidth
          />
          <SoftInput
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description"
            fullWidth
            multiline
            rows={4}
          />
          <SoftBox mt={2}>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            >
              <option value="" disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            >
              <option value="" disabled>
                Select a team member
              </option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {`${member.firstName} ${member.lastName}`}
                </option>
              ))}
            </select>
            <SoftInput
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours"
              fullWidth
            />
            <SoftInput
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Days"
              fullWidth
            />
          </SoftBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <SoftBox py={3}>
        <Card>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <SoftTypography variant="h6">My Tasks</SoftTypography>
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
            <Table columns={taskCols} rows={taskRows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
