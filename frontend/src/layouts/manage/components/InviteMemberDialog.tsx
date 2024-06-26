/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { Box, Dialog, DialogTitle } from '@mui/material';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import React, { useState } from 'react';
import { axiosInstance } from 'utils';

export default function InviteMemberDialog({ teamId, onClose, open }) {
  const [email, setEmail] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleInvite = async (teamId: string, email: string) => {
    if (!email)  return alert('Please enter email');
    await axiosInstance.post('/invitations', {
      receiver: {
        email,
      },
      team: {
        id: teamId,
      },
    });

    setEmail('');
    onClose();
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add a new member</DialogTitle>
      <Box sx={{ padding: '20px' }} display={'flex'} alignItems={'center'}>
        <SoftInput
          placeholder={'email'}
          value={email}
          onChange={handleInputChange}
        />
        <SoftButton
          onClick={() => handleInvite(teamId, email)}
          sx={{
            marginLeft: '6px',
            background: '#a6f7ca',
            '&:hover': {
              background: '#a6f7f1',
            },
          }}
        >
          Invite
        </SoftButton>
      </Box>
    </Dialog>
  );
}
