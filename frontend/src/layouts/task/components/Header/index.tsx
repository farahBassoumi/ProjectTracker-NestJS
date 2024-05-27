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
import SoftAvatar from 'components/SoftAvatar';
import { getUserIdFromToken } from 'utils/getuserid';
import { getStatusText } from 'utils/taskStatusMapping';
// Soft UI Dashboard React examples
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

// Soft UI Dashboard React base styles
import breakpoints from 'assets/theme/base/breakpoints';

// Images
import burceMars from 'assets/images/bruce-mars.jpg';
import curved0 from 'assets/images/curved-images/curved0.jpg';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchTask } from 'layouts/task/data/TaskListData';
import { Icon, Menu, MenuItem } from '@mui/material';
import { handleError } from 'utils';

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabValue, setTabValue] = useState(0);
  const [task, setTask] = useState([]);
  const { taskId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResult = await fetchTask(taskId); // Pass projectId to fetchTasks
        setTask(tasksResult);
      } catch (error) {
        handleError(error, navigate);
      }
    };
    fetchData();
  }, []);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const assignedToMe = task.assignedTo
    ? task.assignedTo.id === getUserIdFromToken()
    : false;

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
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
                ASSIGNED TO{' '}
                <strong>
                  {!assignedToMe && task.assignedTo
                    ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
                    : 'Me'}
                </strong>
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
                &nbsp;&nbsp;&nbsp;
                {task.status ? getStatusText(Number(task.status)) : 'To Do'}
              </SoftTypography>
              <SoftTypography variant="h5" fontWeight="medium">
                Area
              </SoftTypography>
              <SoftTypography variant="h4" fontWeight="medium">
                <LuReplace />
                &nbsp;&nbsp;&nbsp;{task.project ? task.project.name : 'project'}
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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {task.comments ? task.comments.length : 0}
              </SoftTypography>
              <SoftTypography variant="h5" fontWeight="medium">
                Due Date&nbsp;&nbsp;&nbsp;&nbsp;
              </SoftTypography>
              <SoftTypography variant="h4" fontWeight="medium">
                <MdDateRange />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {task.dueDate
                  ? new Date(task.dueDate).toDateString()
                  : 'No Due Date'}
              </SoftTypography>
            </Box>
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
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <SoftBox>
            <SoftTypography variant="h6" gutterBottom>
              <strong>Description</strong>
            </SoftTypography>
          </SoftBox>
          <SoftBox color="text" px={2}>
            <Icon
              sx={{ cursor: 'pointer', fontWeight: 'bold' }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </SoftBox>
          {renderMenu}
        </SoftBox>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom p={3}>
            {task.description ? (
              task.description
            ) : (
              <strong>Add Description</strong>
            )}
          </SoftTypography>
        </SoftBox>
      </Card>
    </SoftBox>
  );
}

export default Header;
