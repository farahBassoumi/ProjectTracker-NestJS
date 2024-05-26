/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect, useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';
// import Icon from '@mui/material/Icon';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard Materail-UI example components
import Table from 'examples/Tables/Table';

// Data
import fetchTeamData from './data';
import members from './data/exampleTeam';
import ContextMenu from './ContextMenu';
// import { useNavigate } from 'react-router-dom';
// import InviteMemberDialog from './InviteMemberDialog';

function TeamsTable({ name, projectId }) {
  const [rows, setRows] = useState();
  const columns = [
    { name: 'email', align: 'left' },
    { name: 'firstName', align: 'center' },
    { name: 'lastName', align: 'center' },
    { name: 'role', align: 'center' },
    { name: 'kick', align: 'center' },
  ];

  useEffect(() => {
    // replace members with api call
    const res = members;
    const rows = fetchTeamData(res);
    setRows(rows);
  }, []);

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
            {name}
          </SoftTypography>
        </SoftBox>
        <ContextMenu projectId={projectId} />
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

export default TeamsTable;
