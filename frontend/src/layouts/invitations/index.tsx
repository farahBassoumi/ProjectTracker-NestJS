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
    event: Event,
    status: InvitationStatus.Accepted | InvitationStatus.Dismissed,
  ) => {
    if (!invitation) {
      return;
    }

    event.preventDefault();

    let uri = '/projects';

    await axiosInstance.post(`/invitations/${id}/respond`, {
      status,
    });

    if (status === InvitationStatus.Accepted) {
      uri = `/project/${invitation.team.project.id}`;
    }

    navigate(uri);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
              onClick={(event: Event) =>
                handleRespond(event, InvitationStatus.Dismissed)
              }
            >
              Dismiss
            </SoftButton>
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="info"
              onClick={(event: Event) =>
                handleRespond(event, InvitationStatus.Accepted)
              }
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
