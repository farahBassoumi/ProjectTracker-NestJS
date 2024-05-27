/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Table from 'examples/Tables/Table';
import ContextMenu from './ContextMenu';
import formatTeamData from './data';

/////// test data
import members from './data/exampleTeam';

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
    const res = [projectId, members];
    const rows = formatTeamData(res);
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
