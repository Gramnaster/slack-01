'use client';

// import { Suspense, useActionState } from 'react';
// import { authenticate } from '@/lib/actions';
import LoginForm from '@/ui/login-form';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { Suspense } from 'react';
import Background from '../../../../public/assets/images/bg-welcome-01.png';

export default function LoginPage() {
  // useActionState imported from base React for React 19+
  // Parameters: authenticate and undefined init state
  // Returns: errorMessage from server, formAction that handles state, isPending if action is running
  // Needs 'use client' since it's a React hook
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined,
  // );

  // formAction passes data to authenticate @/lib/actions Server Comp
  // Server Comp processes login and returns result to useActionState as 'authenticate'
  // Component re-renders with new state
  return (
    <Box
      component='main'
      sx={{
        boxSizing: 'border-box',
        flex: 1,
        p: '2rem',
        m: 0,
        height: '100vh',
        width: '100%',
        overflowY: 'auto',
        backgroundImage: `url(${Background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '16/9',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row'}
    }}>
      <img src='/assets/images/bg-corner-topleft-01.png' style={{ position: 'absolute', top: 40, left: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
      <img src='/assets/images/bg-corner-topright-01.png' style={{ position: 'absolute', top: 40, right: 40, width: '40px', height: '40px' }} alt="Top right corner design" />
      <img src='/assets/images/bg-corner-bottomleft-01.png' style={{ position: 'absolute', bottom: 40, left: 40, width: '40px', height: '40px' }} alt="Bottom left corner design" />
      <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Bottom right corner design" />
      {/* <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Top right back button" /> */}
      <Link href='/' style={{ position: 'absolute', top: 50, right: 120, width: '40px', height: '40px' }}>
        <Button>RETURN_HOME</Button>
      </Link>
      <Box 
        component='section'
        sx={{
          flex: 1,
          w: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          flexDirection: 'column'
      }}>
        <Suspense>
          <LoginForm/>
        </Suspense>
      </Box>
    </Box>
  );
}