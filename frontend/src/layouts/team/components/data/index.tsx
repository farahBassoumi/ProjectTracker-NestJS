//@ts-nocheck
// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// members

export default function formatTeamData(members) {
  const rows = members.map((member) => ({
    firstName: member.firstName,
    lastName: (
      <SoftBox display="flex" py={1}>
        {member.lastName}
      </SoftBox>
    ),
    email: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {member.email}
      </SoftTypography>
    ),
    role: (
      <select value={member.role}>
        <option value="member">Member</option>
        <option value="sub-leader">Sub-Leader</option>
      </select>
    ),
    kick: <button>kick</button>,
  }));

  return rows;
}
