'use client';

import { SignMeUpButton } from "@/components/main-menu/buttons";
import { createNewUser } from "@/lib/data";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Input, InputLabel, Paper, Stack, styled, Typography } from "@mui/material"
import { useState } from "react";
import { RadioButtonUnchecked, CheckCircleOutline } from '@mui/icons-material';

export default function CreateUserForm() {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log('create-user.js handleSubmit passed result to createNewUser:', result);
      return console.log('create-user.js handleSubmit is successful');
    } catch (error) {
      if (error) {
        return console.log('create-user.js error:', error);
      }
    }
    return console.log('create-user.js handleSubmit is done');
  };

  // useEffect(() => {
  //   handleSubmit();
  //   createNewUser(userData);
  //   console.log('create-user.js userData:', userData);
  // }, [userData]);

  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: '400px',
    height: '550px',
    ...theme.typography.body2,
  }));

  // const SecureCheckbox = styled(FormControlLabel)(({ theme }) => ({
  //   // width: '64px',
  //   // height: '64px',
  //   fontSize: '64px',
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
          p: '40px',
      }}>
        <form autoComplete='off' method='post' onSubmit={handleSubmit}>
          <Stack direction='column' gap='20px' sx={{position:'relative'}}>
            <Typography variant='h5' sx={{display: 'flex', justifyContent: 'center', pb:'10px'}}>SIGN_UP_NOW</Typography>
            <Box>
              <InputLabel htmlFor='email'>new_email</InputLabel>
              <Input variant='outlined' color='primary' id='email' name='email' type='email' placeholder='new_email@gmail.com' required />
            </Box>

            <Box>
              <InputLabel id='password'>new_password</InputLabel>
              <Input variant="outlined" color='primary' id='password' name='password' type='password' placeholder='secure_pass_12345' required />
            </Box>
            <Box>
              <InputLabel id='password-confirm'>verify_password</InputLabel>
              <Input variant='outlined' color='primary' id='password-confirm' name='password-confirm'  type='password' placeholder='Same as above' required />
            </Box>
            <Paper>
              <FormGroup>
                <FormControlLabel required control={<Checkbox icon={<RadioButtonUnchecked />}/>} label="security_protocol totally_not_a_robot" 
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 64, '& path': { strokeWidth: 1 } }}}/>
              </FormGroup>
            </Paper>
            {/* <Button type='submit'>SIGN_ME_UP</Button> */}
            <Box sx={{display: 'flex', alignContent:'flex-end', justifyContent: 'flex-end'}}>
              <SignMeUpButton/>
            </Box>
          </Stack>
        </form>
      </DemoPaper>
    </Box>
  )
}