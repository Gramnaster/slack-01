'use client';

import { authenticate } from "@/lib/actions";
import { createChannel } from "@/lib/data";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

// export default function ChannelDialog () {
//   // const [modalState, setModalState] = useState({ type: null, user: null });

//   return (
//     <Dialog
//       open={modalState.type !== null}
//       onClose={handleCloseModal}
//       fullWidth
//       maxWidth="sm"
//     >
//       <DialogTitle
//         className='cinzel-heading'
//         sx={{
//           font: '16px',
//           justifyContent: 'center',
//           alignContent: 'flex-start',
//         }}
//       >
//         {getModalTitle()}
//       </DialogTitle>
//       <DialogContent dividers>
//         {renderModalContent()}
//       </DialogContent>
//     </Dialog>
//   )
// }

export default function ChannelDialog({ users = [] }) {
  console.log('ChannelDialog is running');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Basic declarations because I need them
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [channelName, setChannelName] = useState('');
  // const [userList, setUserList] = useState('');
  const [nameError, setNameError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUsers([]);
    setChannelName('');
    setNameError('');
    setErrorMessage('');
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries(formData.entries());
  //   const email = formJson.email;
  //   console.log(email);
  //   handleClose();
  // };

  const handleChannelNameChange = (event) => {
    const name = event.target.value;
    setChannelName(name);
    if (name.length > 0 && name.length < 5) {
      setNameError('//WARN: CHANNEL NAME MUST BE > 5 CHARS');
    } else {
      setNameError('');
    }
  };

  // Always ensures my state is always an array
  // Because autofill keeps screwing it up
  const handleUserSelectChange = (event) => {
    const { target: { value } } = event;
    // On autofill we get a stringified value.
    // Technique to handle multi-select dropdown in MUI
    setSelectedUsers(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async (e) => {
    // 'use server';
    e.preventDefault();
    

    // // Prevent double submission
    // if (formSubmitted || isPending) {
    //   alert('//WARN: SUBMISSION IN PROGRESS');
    //   return;
    // }

    if (channelName.length < 5) {
      setNameError('//WARN: CHANNEL NAME MUST BE > 5 CHARS');
      return;
    }

    if (nameError) return;

    
    setIsPending(true);
    setErrorMessage('');

    // const formData = new FormData(e.currentTarget);
    // if (formData.get('name') === '') {
    //   alert('//WARN: ENTER A CHANNEL NAME');
    //   return;
    // } else if (formData.get('name').length < 5) {
    //   alert('//WARN: CHANNEL NAME MUST BE LONGER THAN 5 CHARS');
    //   return;
    // }

    const requestBody = {
      'name': channelName,
      'user_ids': selectedUsers
    };
    console.log('create-user.js handleSubmit parsedFormData:', requestBody);

    try {
      const result = await createChannel(requestBody);
      router.refresh();
      console.log('ChannelDialog await createChannel result:', result);
      setFormSubmitted(true);
      handleClose();
    } catch (error) {
      if (error) {
        setErrorMessage(error.message || 'Failed to create channel');
      }
    }
    setIsPending(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} sx={{gap: 1, borderRadius: 0, textAlign:'center'}}>
        <img src='/assets/images/button-signup-01.png'/> ADD_CHANNEL
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>+ Add_Channel +</DialogTitle>
        <DialogContent>
          <DialogContentText color='primary'>
            [DESC]::Please enter thy channel name and desired members.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="channel-form">
            {/* Channel Name Textfield */}
            {/* <InputLabel color='text.primary'>new_channel_name</InputLabel> */}
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="ch/::channel_name"
              type="text"
              fullWidth
              variant="standard"
              value={channelName}
              onChange={handleChannelNameChange}
              helperText={nameError}
            />
            {/* Dropdown forms */}
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel color='text.primary'>desired_members</InputLabel>
              <Select
                  labelId="user-select-label"
                  id="user-select"
                  multiple
                  value={selectedUsers}
                  onChange={handleUserSelectChange}
                  input={<OutlinedInput label="Add Members" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((userId) => {
                        const user = users.find(u => u.id === userId);
                        return <Chip key={userId} label={user ? user.email : userId} />;
                      })}
                    </Box>
                  )}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id} sx={{fontSize:'12px'}}>
                     +id:{user.id}-{user.email}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="channel-form" aria-disabled={isPending} sx={{pointerEvents: isPending ? 'none' : 'auto',}}>
            <img src='/assets/images/button-login-01.png'/> {isPending ? 'CREATING...' : 'CREATE_CHANNEL'}
          </Button>
          {errorMessage && (
              <p style={{ color: 'red', p: 1  }}>{errorMessage}</p>
            )}
        </DialogActions>
      </Dialog>
    </>
  );
}