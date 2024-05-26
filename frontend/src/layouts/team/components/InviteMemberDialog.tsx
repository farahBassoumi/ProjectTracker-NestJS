/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { Box, Dialog, DialogTitle } from '@mui/material';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import React, { useState } from 'react';

export default function InviteMemberDialog({ teamId, onClose, open }) {
  const [email, setEmail] = useState('email');

  const handleClose = () => {
    onClose();
  };
  const handleInvite = (teamId, email) => {
    alert(`teamId:${teamId}   email:${email}`);
    onClose();
  };
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add a new member</DialogTitle>
      <Box sx={{ padding: '20px' }}>
        <SoftInput value={email} onChange={handleInputChange} />
        <SoftButton onClick={() => handleInvite(teamId, email)}>
          Invite
        </SoftButton>
      </Box>
    </Dialog>
  );
}
