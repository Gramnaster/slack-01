// import { authenticate } from "@/lib/actions";
import { addChannelMembers } from "@/lib/data";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddMemberDialog({ users = [], channelId}) {
  console.log('ChannelDialog is running');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const [channelName, setChannelName] = useState('');
  // const [userList, setUserList] = useState('');
  const [nameError, setNameError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId('');
    // setChannelName('');
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
  
  // const handleUserSelectChange = (event) => {
  //   setSelectedUserId(event.target.value);
  // };
  
  const handleSubmit = async (e) => {
    // 'use server';
    e.preventDefault();

    if (!selectedUserId) {
      setErrorMessage('Please select a user to add.');
      return;
    }
    
    setIsPending(true);
    setErrorMessage('');

    const requestBody = {
      'id': channelId,
      'member_id': selectedUserId
    };
    console.log('create-user.js handleSubmit parsedFormData:', requestBody);

    try {
      const result = await addChannelMembers(requestBody);
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
      <Button variant="contained" onClick={handleClickOpen} fullWidth sx={{gap: 1, borderRadius: 0, textAlign:'center'}}>
        <img src='/assets/images/icon-adduser-01.png'/> ADD_MEMBER
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>+ Add_Member +</DialogTitle>
        <form onSubmit={handleSubmit} id="add-member-form">
          <DialogContent>
            <DialogContentText color='primary' sx={{ mb: 2 }}>
              [DESC]::Select a user to add to this channel.
            </DialogContentText>
            <FormControl fullWidth variant="standard">
              <InputLabel color='primary'>Select_User</InputLabel>
              <Select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id} sx={{ fontSize: '12px' }}>
                    +id:{user.id}-{user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{gap: 1, borderRadius: 0}}>Cancel</Button>
            <Button type="submit" form="add-member-form" variant='contained' aria-disabled={isPending} sx={{gap: 1, pointerEvents: isPending ? 'none' : 'auto', borderRadius: 0}}>
              <img src='/assets/images/button-login-01.png'/> {isPending ? 'ADDING...' : 'ADD_MEMBER'}
            </Button>
            {errorMessage && (
                <Typography sx={{ color: 'red', p: 1 }}>{errorMessage}</Typography>
              )}
          </DialogActions>
          </form>
      </Dialog>
    </>
  );
}