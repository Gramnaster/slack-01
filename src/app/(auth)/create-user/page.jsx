'use client';

import CreateUserForm from '@/ui/create-user'
import { Box, Container, Paper, Typography } from '@mui/material';
import { Suspense } from 'react';
import Background from '../../../../public/assets/images/bg-welcome-01.png';
import Link from 'next/link';

export default function CreateUserPage() {
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
        <Box>
          <Link href='/login'>
            <Suspense>
              <CreateUserForm />
            </Suspense>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}