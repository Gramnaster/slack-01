import { createNewUser } from "@/lib/data";
import { Box, Button, Input, InputLabel } from "@mui/material"
import { useState } from "react";

export default function CreateUser() {
  return (
    <div>
      <Box component='form' autoComplete='off' action={createNewUser}>
        <InputLabel htmlFor='email'>new_email</InputLabel>
        <Input id='email' type='email' placeholder='new_email@gmail.com' required />

        <InputLabel htmlFor='password'>new_password</InputLabel>
        <Input id='password' type='password' placeholder='secure_pass_12345' required />

        <InputLabel htmlFor='password-confirm'>verify_password</InputLabel>
        <Input id='password-confirm' type='password' placeholder='Same as above' required />
        <Button type='submit'>SIGN_ME_UP</Button>
      </Box>
    </div>
  )
}