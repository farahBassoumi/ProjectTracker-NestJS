/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { Icon, Menu, MenuItem } from '@mui/material';
import SoftBox from 'components/SoftBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InviteMemberDialog from './InviteMemberDialog';

const ContextMenu = ({ projectId }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleCloseProject = (projectId) => {
    alert(projectId);
    closeMenu();
    navigate('/team');
  };

  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInvite = () => {
    setOpen(true);
    closeMenu();
  };

  return (
    <>
      <SoftBox color="text" px={2}>
        <Icon
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          fontSize="small"
          onClick={openMenu}
        >
          more_vert
        </Icon>
      </SoftBox>
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
        <MenuItem onClick={handleInvite}>Invite member</MenuItem>
        <MenuItem onClick={() => handleCloseProject(projectId)}>
          Close project
        </MenuItem>
      </Menu>
      <InviteMemberDialog
        open={open}
        onClose={handleCloseDialog}
        teamId={projectId}
      />
    </>
  );
};

export default ContextMenu;
