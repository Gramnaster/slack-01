// 'use client';

// import { redirect } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Codegen from '@/components/main-menu/codegen';
import { Box, Container, Typography } from '@mui/material';
// import { formatDateToLocal } from '@/lib/utils';

export default function MainPage() {
  // Redirect to a default channel when users land on the root page.
  // const [triNumber, setTriNumber] = useState('000 000 000 000');
  
  // useEffect(() => {
    // const handleStart = () => setIsLoading(true);
    // const handleComplete = () => setIsLoading(false);
  //   setTriNumber(Codegen());
  // }, []);

  return (
    <Box sx={{display:'flex'}}>
      {/* <Typography sx={{ position: 'absolute', top: 60, left: 60 }}> USER-ACCESS-GRANTED // </Typography> */}
      {/* <Typography sx={{ position: 'absolute', bottom: 60, left: 60 }}>{triNumber} // </Typography> */}
      {/* <Typography sx={{ position: 'absolute', top: 60, right: 60 }}>{formatDateToLocal()} </Typography> */}
      {/* <Typography sx={{ position: 'absolute', bottom: 60, right: 60 }}>// {formatDateToLocal('yearFormat')}-ALLRIGHTSRESERVED-COPYRIGHT:JPVILLALON </Typography> */}
      <Container sx={{position:'relative', display:'flex', justifyContent:'center', alignItems:'center', alignContents:'center', alignSelf:'center', textAlign: 'center',}}>
        <Typography variant='body2' sx={{ position:'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', h:'100%'  }}> {/* eslint-disable-next-line */}
          Welcome to Miscord's Homepage
          </Typography>
      </Container>
    </Box>
  )
}
