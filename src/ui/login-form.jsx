'use client'

import { authenticate } from "@/lib/actions";
import { Box, Button, InputLabel, OutlinedInput, Paper, Stack, styled, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '400px',
  height: '320px',
  ...theme.typography.body2,
}));

export default function LoginForm() {
  // If they try to access a specific page w/o auth, redirects them to login
  // After login, sends them back to where they were trying to go to
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // useActionState imported from base React for React 19+
  // Parameters: authenticate and undefined init state
  // Returns: errorMessage from server, formAction that handles state, isPending if action is running
  // Needs 'use client' since it's a React hook
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  // formAction passes data to authenticate @/lib/actions Server Comp
  // Server Comp processes login and returns result to useActionState as 'authenticate'
  // Component re-renders with new state
  return (
    <Box 
      sx={{
        h:'400px', 
        w: '400px', 
        p: '50px',
    }}>
      <DemoPaper 
        elevation={24}
        sx={{
          p: '30px',
      }}>
      <form action={formAction}>
        <Box sx={{h:'100%', w:'100%'}}>
          <Stack direction='column' gap='20px' sx={{position:'relative'}}>
            <Typography variant='h5' sx={{display: 'flex', justifyContent: 'center'}}>LOG_IN_NOW</Typography>
            <Box>
              <InputLabel htmlFor='email' color='primary'>new_email *</InputLabel>
              <OutlinedInput variant='outlined' color='primary' fullWidth id='email' name='email' type='email' 
                placeholder='//new_email@gmail.com' autoComplete='off'
                sx={{
                  height: '30px', borderRadius: 0,
                  backgroundColor: 'transparent', fontSize: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {borderColor: '#FF7300', borderWidth: '1px'},
                  '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#FF7300'},
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#FF7300', borderWidth: '1px'},
                  '& input': {color: '#FF7300', padding: '8px 12px'},
                  '& input::placeholder': {color: 'rgba(255, 115, 0, 0.5)', opacity: 1,}}}
              />
            </Box>
            <Box>
              <InputLabel id='password' color='primary'>new_password *</InputLabel>
              <OutlinedInput variant="outlined" color='primary' fullWidth id='password' name='password' type='password' 
                placeholder='//secure_pass_12345' required 
                sx={{
                  height: '30px', borderRadius: 0,
                  backgroundColor: 'transparent', fontSize: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {borderColor: '#FF7300', borderWidth: '1px'},
                  '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#FF7300'},
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#FF7300', borderWidth: '1px'},
                  '& input': {color: '#FF7300', padding: '8px 12px'},
                  '& input::placeholder': {color: 'rgba(255, 115, 0, 0.5)', opacity: 1,}}}
              />
            </Box>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Button type="submit" aria-disabled={isPending} variant='contained' 
              sx={{w:'120px', h:'42px', borderRadius: 0, gap: 1, pointerEvents: isPending ? 'none' : 'auto',}}>
              <img src='/assets/images/button-login-01.png'/> {isPending ? 'Logging in...' : 'LOG_IN'}
            </Button>
            {errorMessage && (
              <Typography sx={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Typography>
            )}
            </Stack>
          </Box>
        </form>
      </DemoPaper>
    </Box>
  )
}