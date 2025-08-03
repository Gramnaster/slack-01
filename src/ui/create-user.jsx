'use client';

import { SignMeUpButton } from "@/ui/buttons";
import { createNewUser } from "@/lib/data";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Input, InputLabel, OutlinedInput, Paper, Stack, styled, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '400px',
  height: '550px',
  ...theme.typography.body2,
}));

export default function CreateUserForm() {
  useEffect(() => {
    console.log("CreateUserForm mounted");
    return () => console.log("CreateUserForm unmounted");
  }, []);
  // const [formData, setFormData] = useState('');

  // const testFormData = (event) => {
  //   event.preventDefault(); 

  //   const form = event.target
  //   const formDataObj = new FormData(form);
  //   const data = {
  //     email: formDataObj.get('email'),
  //     password: formDataObj.get('password'),
  //     passwordConfirm: formDataObj.get('password-confirm')
  //   };

  //   setFormData(data);
  //   console.log(`1 Create user:`, data);
  // }
  // const [formData, setFormData] = useState('');

  // const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleCheckboxClick = () => {
    // Trying to prevent the forms for being cleared
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.preventDefault();
    // e.nativeEvent.stopImmediatePropagation();
    console.log('Checkbox clicked, current state:', isChecked);
    setIsChecked(!isChecked);
    console.log('Checkbox state after click:', !isChecked);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (formSubmitted || isLoading) {
      console.log('Submission already in progress');
      return;
    }

    if (!isChecked) {
      alert('//WARN: PLEASE COMPLETE THE SECURITY PROTOCOL');
      return;
    }

    setFormSubmitted(true);
    setIsLoading(true);
    const formData = new FormData(e.target);
    const requestBody = {
      'email': formData.get('email'),
      'password': formData.get('password'),
      'password-confirmation': formData.get('password-confirm')
    };
    console.log('create-user.js handleSubmit parsedFormData:', requestBody);
    
    try {
      // setUserData(requestBody);
      const result = await createNewUser(requestBody);
      // Check if condition for redirect
      // if (result.errors) redirect('/login');
      console.log('create-user.js handleSubmit passed result to createNewUser:', result);
      if (result && result.status === 'success') redirect('/login');
      return console.log('create-user.js handleSubmit is successful');
    } catch (error) {
      if (error) {
        return console.log('create-user.js error:', error);
      }
    } finally {
      setIsLoading(false);
      setFormSubmitted(false);
    }
    
    return console.log('create-user.js handleSubmit is done');
  };

  // useEffect(() => {
  //   handleSubmit();
  //   createNewUser(userData);
  //   console.log('create-user.js userData:', userData);
  // }, [userData]);

  // const SecureCheckbox = styled(FormControlLabel)(({ theme }) => ({
  //   // width: '64px',
  //   // height: '64px',
  //   fontSize: '64px',
  //   // src: '../../../../public/assets/images/bg-welcome-01.png',
  //   ...theme.typography.body2,
  // }));

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
                <InputLabel htmlFor='email'>new_email *</InputLabel>
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
                <InputLabel id='password'>new_password *</InputLabel>
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
                <InputLabel id='password-confirm'>verify_password *</InputLabel>
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
                // style={{display:'flex', justifyContent: 'center', border:'1px solid #FF7300'}}
                >
                <Box 
                  onClick={handleCheckboxClick}
                  // onMouseDown={(e) => e.preventDefault()}
                  // style={{
                  //   cursor: 'pointer',
                  //   border: 'none',
                  //   background: 'transparent',
                  //   padding: '8px 0 8px 26px'
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
                    {/* Hidden input for form submission purposes */}
                    {/* <input 
                      type="hidden" 
                      name="security-check" 
                      value={isChecked ? "true" : "false"} 
                    /> */}
                  </Box>
                </Box>
              </Box>
              
              {/* <Button type='submit'>SIGN_ME_UP</Button> */}
              <Box sx={{display: 'flex', alignContent:'flex-end', justifyContent: 'flex-end', pb: 1}}>
                {/* Maybe don't link here and add the redirect to SignMeUpButton instead
                when the user account creation is successful */}
                <SignMeUpButton disabled={!isChecked || isLoading} />
              </Box>
            </Stack>
          </Box>
        </form>
      </DemoPaper>
    </Box>
  )
}