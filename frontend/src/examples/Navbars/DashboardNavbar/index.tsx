import { useState, useEffect } from 'react';

// react-router components
import { useLocation, Link, useNavigate } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import Breadcrumbs from 'examples/Breadcrumbs';
import NotificationItem from 'examples/Items/NotificationItem';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles';

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from 'context';

// Images
import team2 from 'assets/images/team-2.jpg';
import webSocketService from '../../../utils/websocketService';
import { user } from '../../../utils/user';
import { User } from '../../../interfaces/User';
import {
  Notification,
  NotificationType,
} from '../../../interfaces/Notification';
import { axiosInstance } from '../../../utils';
import { Task } from '../../../interfaces/Task';
import { Invitation } from '../../../interfaces/Invitation';
import dateFormatter from '../../../utils/dateFormatter';

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } =
    controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split('/').slice(1);
  const currentUser: User = user();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axiosInstance.get(`/notifications`);
      res.data.data = res.data.data
        .map(({ createdAt, ...notif }) => {
          return { createdAt: new Date(createdAt), ...notif };
        })
        .sort(function (a, b) {
          var c = a.createdAt;
          var d = b.createdAt;
          return d - c;
        });
      setNotifications(res.data.data);
    };

    fetchNotifications();

    webSocketService.connect(currentUser.id);

    webSocketService.onNotification((notification: Notification) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleNotificationClick = (e, targetId, type) => {
    e.preventDefault();
    navigate(`${type}/${targetId}`);
  };
  // Render the notifications menu
  const renderMenu = (notifications) => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {notifications.length != 0 &&
        notifications.map(({ createdAt, type: type_, data }: Notification) => {
          const date = new Date(createdAt);
          const { id, name } = data;
          let title;
          let targetId;
          let subtitle;
          let type;

          switch (type_) {
            case NotificationType.projectInvitation:
              title = 'Project Invitation ';
              targetId = id;
              subtitle = data.project?.name;
              type = 'projects';
              break;
            case NotificationType.taskAssignment:
              title = 'Task Assigned: ';
              targetId = id;
              subtitle = name;
              type = 'tasks';
              break;
            case NotificationType.taskDeletion:
              title = 'Task Deleted ';
              targetId = id;
              subtitle = name;
              type = 'tasks';
              break;
            case NotificationType.taskReassignment:
              title = 'Your Task was Reassigned to someone else womp womp';
              targetId = id;
              subtitle = name;
              type = 'tasks';

              break;
            case NotificationType.taskComment:
              title = 'Comment Added On Task';
              targetId = id;
              subtitle = name;
              type = 'tasks';

              break;

            default:
              title = '';
              targetId = '';
              subtitle = '';
              type = 'tasks';

              break;
          }

          return (
            <NotificationItem
              key={id}
              image={<img src={team2} alt="person" />}
              title={[title, subtitle]}
              date={dateFormatter(date)}
              onClick={(e) => handleNotificationClick(e, targetId, type)}
            />
          );
        })}
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox color={light ? 'white' : 'inherit'}>
              {localStorage.getItem('auth') == null ? (
                <Link to="/authentication/sign-in">
                  <IconButton sx={navbarIconButton} size="small">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                    <SoftTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? 'white' : 'dark'}
                    >
                      Sign in
                    </SoftTypography>
                  </IconButton>
                </Link>
              ) : (
                <Link to="/profile">
                  <IconButton sx={navbarIconButton} size="small">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                  </IconButton>
                </Link>
              )}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? 'text-white' : 'text-dark'}>
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? 'text-white' : 'text-dark'}>
                  notifications
                </Icon>
              </IconButton>
              {renderMenu(notifications)}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
