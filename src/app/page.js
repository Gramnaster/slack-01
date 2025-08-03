'use client';

// import { redirect } from 'next/navigation';
// import Navigation from "@/components/Navigation/Navigation";
import { Box, List, ListItemIcon, Stack, Typography } from "@mui/material";
// import Link from "next/link";
import Background from '../../public/assets/images/bg-welcome-01.png';
import ListItem from '@mui/material/ListItem';
import { formatDateToLocal } from "@/lib/utils";
import Codegen from "@/components/main-menu/codegen";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoginButton, { SignUpButton } from "@/ui/buttons";

export default function RootPage() {
  // By default, redirect logged-in users to a general channel.
  // The middleware already ensures only authenticated users can see this.
  // redirect('/login');
  const mainDescription = [
    'MISCORD is great for communicating with your allies in a highly secure yet stylish way!',
    'Message friends, family, co-workers, and even strangers you shouldn’t be talking to!',
    'This app is totally not vulnerable to the SIGINT of NSA, CIA, Mossad, FSB, et al.',
    'This project has been designed and programmed by John Patrick Villalon.'
  ];

  const [isLoading, setIsLoading] = useState(false); 
  // const router = useRouter();
  const [triNumber, setTriNumber] = useState('000 000 000 000');

  useEffect(() => {
    // const handleStart = () => setIsLoading(true);
    // const handleComplete = () => setIsLoading(false);
    setTriNumber(Codegen());
  }, []);

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
        {/* Background Details */}
        <img src='/assets/images/bg-corner-topleft-01.png' style={{ position: 'absolute', top: 40, left: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
        <img src='/assets/images/bg-corner-topright-01.png' style={{ position: 'absolute', top: 40, right: 40, width: '40px', height: '40px' }} alt="Top right corner design" />
        <img src='/assets/images/bg-corner-bottomleft-01.png' style={{ position: 'absolute', bottom: 40, left: 40, width: '40px', height: '40px' }} alt="Bottom left corner design" />
        <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Bottom right corner design" />
        <img src='/assets/images/bg-dots-top-01.png' style={{ position: 'absolute', top: 40, width: '248px', height: '12px' }} alt="Center three dots" />
        <img src='/assets/images/bg-dots-bottom-01.png' style={{ position: 'absolute', bottom: 40, width: '400px', height: '12px' }} alt="Center three dots" />
        <Typography sx={{ position: 'absolute', top: 60, left: 60 }}> USER-ACCESS-GRANTED // </Typography>
        {/* eslint-disable-next-line */}
        <Typography sx={{ position: 'absolute', bottom: 60, left: 60 }}>{triNumber} // </Typography>
        <Typography sx={{ position: 'absolute', top: 60, right: 60 }}>{formatDateToLocal()} </Typography>
        {/* eslint-disable-next-line */}
        <Typography sx={{ position: 'absolute', bottom: 60, right: 60 }}>// {formatDateToLocal('yearFormat')}-ALLRIGHTSRESERVED-COPYRIGHT:JPVILLALON </Typography>
        
        {/* I Think This Is Filler */}
        <Box
          component='header'
          sx={{
            h: '100%',
            w: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between'
        }}>
          
        </Box>
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
          
          <Box sx={{display:'flex', flexDirection:'row', gap:5, alignItems:'center'}}>
            <Box sx={{w:'120px', h:'120px', aspectRatio:'1/1'}}>
              <img src='/assets/images/bg-largebox-01.png'/>
            </Box>
          <Typography variant='h1' component='h1' color={"primary"}
            sx={{ letterSpacing: 10, fontSize: '110px' }}>WELCOME</Typography>
          </Box>
          <Box sx={{paddingBottom: 4}}>
            <List>
              { mainDescription.map((description, index) => {
                return (
                  <ListItem key={index} sx={{maxWidth: '66ch', gap: 2}}>
                    <ListItemIcon sx={{pl: 5, pr: 2}}><img src='/assets/images/bg-smallbox-01.png'/></ListItemIcon>
                    <ListItemIcon><img src='/assets/images/bg-plus-01.png'/></ListItemIcon>
                    <Typography variant="body1">{description}</Typography>
                  </ListItem>
                )})
              }
            </List>
          </Box>
          <Stack spacing={4} direction='row' sx={{pb: 5}}>
            <Link href='/login' onClick={() => setIsLoading(true)}>
              <LoginButton/>
            </Link>
            <Link href='/create-user' onClick={() => setIsLoading(true)}>
              <SignUpButton/>
            </Link>
          </Stack>
          
        </Box>
        <Box
          component='footer'
          sx={{
            // position: 'relative', 
            h: '100%',
            w: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between'
        }}>
          {/* eslint-disable-next-line */}
          {isLoading && <Typography sx={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}>//CHANGING_PAGES...// </Typography>
          }
        </Box>
      </Box>
  )
}