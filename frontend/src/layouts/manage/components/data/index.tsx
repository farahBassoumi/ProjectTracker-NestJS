// @ts-nocheck
import { Box, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import SoftBox from 'components/SoftBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'utils';
///////// role select component
const RoleSelect = ({ teamId, userId, role }) => {
  const [selectedRole, setRole] = useState(role);

  const handleRoleChange = async (event) => {
    const role = event.target.value;
    console.log('role:', role);
    console.log('teamId:', teamId);
    console.log('userId:', userId);
    const result = await axiosInstance.patch(`/members/${teamId}/${userId}`, {
      role,
    });

    console.log('result: ', result);
    console.log('role:', role);

    setRole(role);
  };

  return (
    <Box sx={{ minWidth: '140px' }}>
      <FormControl fullWidth>
        <Select value={selectedRole} onChange={handleRoleChange}>
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="sub-leader">Sub-Leader</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

///////// kick component
const KickMember = ({ teamId, userId }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const result = await axiosInstance.delete(`/members/${teamId}/${userId}`);
    console.log('result: ', result);

    navigate('/manage');
  };

  return (
    <IconButton onClick={handleClick}>
      <LogoutIcon sx={{ color: 'crimson' }} />
    </IconButton>
  );
};

export default function formatTeamData(membersInfo) {
  const rows = membersInfo
    .filter((member) => member.role !== 'LEADER')
    .map((member) => ({
      firstName: (
        <SoftBox display="flex" py={1}>
          {member.firstName}
        </SoftBox>
      ),
      lastName: (
        <SoftBox display="flex" py={1}>
          {member.lastName}
        </SoftBox>
      ),
      email: member.email,
      role: (
        <RoleSelect
          teamId={member.teamId}
          userId={member.id}
          role={member.role}
        />
      ),
      kick: <KickMember teamId={member.teamId} userId={member.id} />,
    }));

  return rows;
}
