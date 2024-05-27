/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Box, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import SoftBox from 'components/SoftBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'utils';
///////// role select component
const RoleSelect = ({ id, role }) => {
  const [selectedRole, setRole] = useState(role);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    const result = axiosInstance.patch(`/teams/${id}`, { role });
    console.log('result: ', result);
    console.log('role:', role);
    alert(role);
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
const KickMember = ({ id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const result=axiosInstance.delete(`/teams/${id}`);
    console.log('result: ', result);
    alert(id);
    //// refresh page after kicking member
    navigate('/manage');
  };

  return (
    <IconButton onClick={handleClick}>
      <LogoutIcon sx={{ color: 'crimson' }} />
    </IconButton>
  );
};

///////// format members array into appropriate rows
export default function formatTeamData(members) {
  const rows = members.map((member) => ({
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
    role: <RoleSelect id={member.id} role={member.role} />,
    kick: <KickMember id={member.id} />,
  }));

  return rows;
}
