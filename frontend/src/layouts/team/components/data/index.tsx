/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
// import SoftTypography from 'components/SoftTypography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelect = ({ id, role }) => {
  const [selectedRole, setRole] = useState(role);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setRole(role);
  };

  return (
    <select value={selectedRole} onChange={handleRoleChange}>
      <option value="member">Member</option>
      <option value="sub-leader">Sub-Leader</option>
    </select>
  );
};

const KickMember = ({ id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    alert(id);
    navigate('/team');
  };

  return <button onClick={handleClick}>kick</button>;
};

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
    email:
      // <SoftTypography variant="caption" color="text" fontWeight="medium">
      member.email,
    // </SoftTypography>
    role: <RoleSelect id={member.id} role={member.role} />,
    kick: <KickMember id={member.id} />,
  }));

  return rows;
}
