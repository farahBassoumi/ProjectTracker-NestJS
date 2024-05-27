import { useEffect, useState } from 'react';

// react-router-dom components
import { useNavigate, useParams } from 'react-router-dom';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';

// Authentication layout components

// Images
import { axiosInstance } from 'utils';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { InvitationStatus } from 'interfaces/InvitationStatus';
import { type Invitation } from 'interfaces/Invitation';
import SoftButton from 'components/SoftButton';
import dateFormatter from '../../utils/dateFormatter';

function Invitation() {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvitation = async () => {
      const { data } = await axiosInstance.get(`/invitations/${id}`);

      setInvitation(data);
    };

    fetchInvitation();
  }, [id]);

  const handleRespond = async (
    status: InvitationStatus.Accepted | InvitationStatus.Dismissed,
  ) => {
    if (!invitation) {
      return;
    }

    await axiosInstance.post(`/invitations/${id}/respond`, {
      status,
    });

    navigate(`/projects/${invitation.team.project.id}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <CoverLayout
            title="Welcome back"
            description="Enter your email and password to sign in"
            image={curved9}
          >
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  &nbsp;&nbsp;Remember me
                </SoftTypography>
              </SoftBox>
    
              <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  Don&apos;t have an account?{' '}
                  <SoftTypography
                    component={Link}
                    to="/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </CoverLayout> */}
      <SoftBox py={3}>
        <SoftBox>
          You Have received an invitation to join a Project from{' '}
          <b> {invitation?.sender.username} </b> . It expires{' '}
          {dateFormatter(new Date(invitation?.expirationDate))}.
          <br /> Project Details:
          <ul style={{ marginLeft: '3cm' }}>
            <li> Name: {invitation?.team.project.name}</li>
            <li> Short Description: {invitation?.team.project.description}</li>
          </ul>
        </SoftBox>
        <SoftBox mt={4} mb={1} display="flex" justifyContent="space-evenly">
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="error"
              onClick={() => handleRespond(InvitationStatus.Dismissed)}
            >
              Dismiss
            </SoftButton>
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="info"
              onClick={() => handleRespond(InvitationStatus.Accepted)}
            >
              Accept
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Invitation;
