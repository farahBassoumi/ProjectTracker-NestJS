import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { axiosInstance, handleError } from 'utils';
import { TaskDisplay } from 'interfaces/TaskDisplay';
import { getStatusText } from 'utils/taskStatusMapping';
import { jwtDecode } from 'jwt-decode';
import {getUserIdFromToken} from 'utils/getuserid';


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
import { Icon, Menu, MenuItem } from '@mui/material';





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
  const [currentTask, setCurrentTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const [menu, setMenu] = useState(null);
  


  

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

  const openMenu = (event, task) => {
    setMenu(event.currentTarget);
    setCurrentTask(task);
  };
  const closeMenu = () => setMenu(null);

  const handleModify = () => {
    if (currentTask) {
      setTaskTitle(currentTask.name);
      setTaskDescription(currentTask.description);
      setSelectedProject(currentTask.project.id);
      setAssignedTo(currentTask.assignedTo ? currentTask.assignedTo.id : '');
      setShowForm(true);
      closeMenu();
    }
  };

  const handleDelete = async () => {
    if (currentTask) {
      try {
      console.log('deleting task:', currentTask);
      const response = await axiosInstance.delete(`/tasks/${currentTask.id}`);
      setTasks(tasks.filter(task => task.id !== currentTask.id));
      console.log('response:', response);
      closeMenu();}
      catch (error) {
        console.log('error deleting task:', error);
      }
    }
    else {
      console.log('no task selected');
    }
  };  
 
  const columns = [
    { name: 'task', align: 'left' },
    { name: 'status', align: 'left' },
    { name: 'assigned_to', align: 'center' },
    { name: 'action', align: 'center' },
  ];


  const rows = tasks.map((task: TaskDisplay) => ({
    task: [<Link to={`/tasks/${task.id}`}>{task.name}</Link>],
    status: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {getStatusText(Number(task.status))}
      </SoftTypography>
    ),
    assigned_to: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {task.assignedTo
          ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
          : 'Unassigned'}
      </SoftTypography>
    ),
    action: <SoftBox><Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small" onClick={(event) => openMenu(event, task)} >
    more_vert 
  </Icon><Menu
      id="simplemn"
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={handleModify}>Modify</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu></SoftBox> }));

  console.log('tasks:', tasks);
 

  const handleAddTask = () => {
    setCurrentTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setSelectedProject('');
    setAssignedTo('');
    setHours('');
    setDays('');
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setTaskTitle('');
    setTaskDescription('');
    setSelectedProject('');
    setAssignedTo('');
    setHours('');
    setDays('');
  };

  const handleSubmit = () => {
    const hoursInMilliseconds = hours ? hours * 60 * 60 * 1000 : 0;
    const daysInMilliseconds = days ? days * 24 * 60 * 60 * 1000 : 0;
    const deadlineInMilliseconds = hoursInMilliseconds + daysInMilliseconds;

    // Create task object
    const taskData = {
      name: taskTitle,
      description: taskDescription,
      project: { id: selectedProject }, // Wrap projectId in an object as required by DTO
      assignedTo: assignedTo ? { id: assignedTo } : undefined,
      duedate: deadlineInMilliseconds,
    };

    try {
      if (currentTask)  {
        axiosInstance.patch(`/tasks/${currentTask.id}`, taskData).then((response) => {
          console.log('Task updated successfully:', response.data); // Check response structure here
          if (response.data) {
            setTasks(tasks.map(task => task.id === currentTask.id ? response.data : task));
          } else {
            console.error('Unexpected response structure:', response);
          }})
        }
       else {{
        axiosInstance.post('/tasks', taskData).then((response) => {
          console.log('Task created successfully:', response.data); // Check response structure here
          if (response.data) {
            setTasks([...tasks, response.data]);
          } else {
            console.error('Unexpected response structure:', response);
          }})
        }
      }
      handleClose();
    } catch (error) {
      console.log('error:', error);
    }
   };
    
    // Send POST request to backend
    

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox display="flex" justifyContent="center" py={3}>
        <SoftButton onClick={handleAddTask}>Add a new task!</SoftButton>
      </SoftBox>
      <Dialog open={showForm} onClose={handleClose}>
        <DialogTitle>{currentTask ? 'Modify Task' : 'Add a New Task'}</DialogTitle>
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
            {currentTask ? 'Update' : 'Submit'}
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
            <Table columns={columns} rows={rows}  />
            
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
