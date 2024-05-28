import { useEffect, useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { baseURL } from 'utils';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard Materail-UI example components
import Table from 'examples/Tables/Table';

// Data
import data from 'layouts/project/components/Events/data';
import { axiosInstance } from 'utils';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Description } from '@mui/icons-material';

function Events(projectId) {
  const [menu, setMenu] = useState(null);
  const [events, setEvents] = useState([]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    async function getExistingEvents() {
      const response = await axiosInstance.get(
        `events/findByProjectId/${projectId}`,
      );

      console.log(response.data);
      setEvents(response.data);
    }

    getExistingEvents();
  }, []);

  useEffect(() => {
    const authString = localStorage.getItem('auth');

    if (!authString) {
      return;
    }

    const { accessToken } = JSON.parse(authString);

    const eventSource = new EventSourcePolyfill(`${baseURL}/events/sse/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSource.onopen = function () {
      console.log('SSE connection opened');
    };

    eventSource.onmessage = function (event) {
      console.log('SSE message received:', event.data);
      const eventObj = JSON.parse(event.data);

      console.log('new event: ', eventObj.data);

      setEvents(events => [...events, eventObj.data]);

      console.log('new list of events: ', events);
      // Add your handling logic here
    };

    eventSource.onerror = function (error) {
      console.error('SSE error:', error);
      // Handle SSE connection error
    };

    return () => {
      eventSource.close();
      console.log('SSE connection closed');
    };
  }, []);

  const buildEventToShow = () => {
    return events.map((event) => {
      return {
        description: event.description,
        by: event.userName,
        at: event.createdAt,
      };
    });
  };

  const { columns, rows } = data(buildEventToShow());


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
    <Card>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Events
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
        <Table columns={columns} rows={rows} />
      </SoftBox>
    </Card>
  );
}

export default Events;
