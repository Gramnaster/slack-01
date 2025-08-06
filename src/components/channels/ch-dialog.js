'use client';

import { authenticate } from "@/lib/actions";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
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

export default function ChannelDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries(formData.entries());
  //   const email = formJson.email;
  //   console.log(email);
  //   handleClose();
  // };

  const [errorMessage, formAction, isPending] = useActionState(
      authenticate,
      undefined,
    );

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} sx={{gap: 1, borderRadius: 0}}>
        <img src='/assets/images/button-signup-01.png'/> ADD_CHANNEL
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>+ Add Channel +</DialogTitle>
        <DialogContent>
          <DialogContentText>
            [DESC]::Please_enter_your_channel_name.
          </DialogContentText>
          <form onSubmit={formAction} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form" aria-disabled={isPending}>
            <img src='/assets/images/button-login-01.png'/> {isPending ? 'CREATING...' : 'CREATE_CHANNEL'}
          </Button>
          {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
        </DialogActions>
      </Dialog>
    </>
  );
}