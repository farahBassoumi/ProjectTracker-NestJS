/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';

import SoftTypography from 'components/SoftTypography';
import Table from 'examples/Tables/Table';
import ContextMenu from './ContextMenu';
import formatTeamData from './data';
import { axiosInstance } from '../../../utils';
/////// test data

import members from './data/exampleTeam';

function TeamsTable({ team, name, projectId }) {
  const [rows, setRows] = useState();
  const [membersInfo, setMembersInfo] = useState([]);

  const columns = [
    { name: 'email', align: 'left' },
    { name: 'firstName', align: 'center' },
    { name: 'lastName', align: 'center' },
    { name: 'role', align: 'center' },
    { name: 'kick', align: 'center' },
  ];

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const promises = team.team.members.map(async (member) => {
        try {
          const response = await axiosInstance.get(`/users/${member.userId}`); // Adjust the API endpoint
          if (member.role === 'MEMBER') {
            response.data.role = 'member';
          } else if (member.role === 'SUB_LEADER') {
            response.data.role = 'sub-leader';
          } else {
            response.data.role = 'LEADER';
          }
          response.data.teamId = member.teamId;

          return response.data;
        } catch (error) {
          console.error(
            `Failed to  fetch member info for ID ${memberId}:`,
            error,
          );
          return null;
        }
      });

      // Wait for all promises to resolve
      Promise.all(promises)
        .then((results) => {
          // Filter out null values (failed requests)
          const validResults = results.filter((result) => result !== null);
          setMembersInfo(validResults);
        })
        .catch((error) => {
          console.error('Error fetching member info:', error);
        });
    };

    fetchMemberInfo();
  }, [team.team.members]); // Run effect when team members array changes

  useEffect(() => {
    console.log('team.team.members', team.team.members);
    // replace members with api call
    const rows = formatTeamData(membersInfo);
    setRows(rows);
    console.log('membersInfo', membersInfo);
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
