'use client';

import { SignMeUpButton } from "@/ui/buttons";
import { createNewUser } from "@/lib/data";
import { Box, InputLabel, OutlinedInput, Paper, Stack, styled, Typography } from "@mui/material"
import { useState } from "react";
import { redirect } from "next/navigation";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '400px',
  height: '550px',
  ...theme.typography.body2,
}));

export default function CreateUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleCheckboxClick = () => {
    // Trying to prevent the forms for being cleared
    console.log('Checkbox clicked, current state:', isChecked);
    setIsChecked(!isChecked);
    console.log('Checkbox state after click:', !isChecked);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (formSubmitted || isLoading) {
      alert('//WARN: SUBMISSION IN PROGRESS');
      return;
    }

    if (password !== passwordConfirm) {
      alert('//WARN: VERIFY PASSWORD MUST BE SAME AS PASSWORD');
      return;
    }

    if (!isChecked) {
      alert('//WARN: PLEASE COMPLETE THE SECURITY PROTOCOL');
      return;
    }

    setFormSubmitted(true);
    setIsLoading(true);

    const requestBody = {
      'email': email,
      'password': password,
      'password-confirmation': passwordConfirm
    };
    console.log('create-user.js handleSubmit parsedFormData:', requestBody);
    
    try {
      const result = await createNewUser(requestBody);
      console.log('create-user.js handleSubmit passed result to createNewUser:', result);
      if (result && result.status === 'success') {
        alert('//SUCCESS: NEW ACCOUNT CREATED');
        redirect('/login');
      }
      return console.log('create-user.js handleSubmit is successful');
    } catch (error) {
      if (error) {
        if (error.digest?.startsWith('NEXT_REDIRECT')) {
          throw error;
        }

        alert(`//ERROR:\n${error.message}`);
        return console.log('create-user.js error:', error);
      }
    } finally {
      setIsLoading(false);
      setFormSubmitted(false);
    }
    
    return console.log('create-user.js handleSubmit is done');
  };

  return (
    <Box 
      sx={{
          h:'600px', 
          w: '400px', 
          p: '50px',
    }}>
      <DemoPaper 
        elevation={24}
        sx={{
          p: '30px',
      }}>
        <form autoComplete='off' onSubmit={handleSubmit} noValidate>
          <Box sx={{h:'100%', w:'100%'}}>
            <Stack direction='column' gap='25px' sx={{position:'relative'}}>
              <Typography variant='h5' sx={{display: 'flex', justifyContent: 'center', pb:'10px'}}>SIGN_UP_NOW</Typography>
              <Box>
                <InputLabel htmlFor='email' color='text.primary'>new_email *</InputLabel>
                <OutlinedInput variant='outlined' color='primary' fullWidth id='email' name='email' type='email' 
                  placeholder='//new_email@gmail.com' autoComplete='off' value={email} 
                  onChange={e => setEmail(e.target.value)} required 
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
                <InputLabel id='password' color='text.primary'>new_password *</InputLabel>
                <OutlinedInput variant="outlined" color='primary' fullWidth id='password' name='password' type='password' 
                  placeholder='//secure_pass_12345' value={password} 
                  onChange={e => setPassword(e.target.value)} required 
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
                <InputLabel id='password-confirm' color='text.primary'>verify_password *</InputLabel>
                <OutlinedInput variant='outlined' color='primary' fullWidth id='password-confirm' name='password-confirm'  type='password' 
                  placeholder='//Same as above' value={passwordConfirm} 
                  onChange={e => setPasswordConfirm(e.target.value)} required 
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

              <Box 
                sx={{ display: 'flex', justifyContent: 'center', py: 1, mt: 1, border: '1px solid #FF7300' }}
                >
                <Box 
                  onClick={handleCheckboxClick}
                  sx={{cursor: 'pointer', pl: 3, py: 1,
                  display:'flex', flexDirection: 'row', 
                  justifyContent:'center', alignItems: 'center'
                }}>
                  <Box sx={{display:'flex', flexDirection: 'row', alignItems:'center', gap: 1}}>
                    {isChecked ? (
                      <img src='/assets/images/button-checkbox-filled-01.png' alt='checked' style={{width:'64px', height:'64px'}}/>
                    ) : (
                      <img src='/assets/images/button-checkbox-empty-01.png' alt='checked' style={{width:'64px', height:'64px'}}/>
                    )} 
                    <Box sx={{display: 'flex', flexWrap:'wrap'}}>
                      <Typography component='span'>security_protocol</Typography>
                      <Typography component='span'>totally_not_a_robot *</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{display: 'flex', alignContent:'flex-end', justifyContent: 'flex-end', pb: 1}}>
                {/* Maybe don't link here and add the redirect to SignMeUpButton instead
                when the user account creation is successful */}
                <SignMeUpButton disabled={!isChecked || isLoading} isLoading={isLoading}/>
              </Box>
            </Stack>
          </Box>
        </form>
      </DemoPaper>
    </Box>
  )
}