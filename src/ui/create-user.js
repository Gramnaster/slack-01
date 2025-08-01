'use client';

import { createNewUser } from "@/lib/data";
import { Box, Button, Input, InputLabel } from "@mui/material"
// import { useEffect, useState } from "react";

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div>
      <form autoComplete='off' method='post' onSubmit={handleSubmit}>
        <InputLabel htmlFor='email'>new_email</InputLabel>
        <Input id='email' name='email' type='email' placeholder='new_email@gmail.com' required />

        <InputLabel id='password'>new_password</InputLabel>
        <Input id='password' name='password' type='password' placeholder='secure_pass_12345' required />

        <InputLabel id='password-confirm'>verify_password</InputLabel>
        <Input id='password-confirm' name='password-confirm'  type='password' placeholder='Same as above' required />
        <Button type='submit'>SIGN_ME_UP</Button>
      </form>
      {/* {formData && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Captured Form Data:</h3>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Password:</strong> {formData.password}</p>
          <p><strong>Confirm:</strong> {formData.passwordConfirm}</p>
        </div>
      )} */}
    </div>
  )
}