'use client';

// import { redirect } from 'next/navigation';
// import Navigation from "@/components/Navigation/Navigation";
import { Box, List, ListItemIcon, Typography } from "@mui/material";
// import Link from "next/link";
import Background from '../../public/assets/images/bg-welcome-01.png';
import ListItem from '@mui/material/ListItem';
import { displayUserAccess, formatDateToLocal } from "@/lib/utils";
// import codegen from "@/components/main-menu/codegen";

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

  const randomTriGenValue = 111;

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
        
        {/* eslint-disable-next-line */}
        <Typography sx={{ position: 'absolute', top: 60, left: 60 }}> user-access // </Typography>
        {/* eslint-disable-next-line */}
        <Typography sx={{ position: 'absolute', bottom: 60, left: 60 }}>{randomTriGenValue} // </Typography>
        <Typography sx={{ position: 'absolute', top: 60, right: 60 }}>{formatDateToLocal()} </Typography>
        {/* eslint-disable-next-line */}
        <Typography sx={{ position: 'absolute', bottom: 60, right: 60 }}>// {formatDateToLocal('yearFormat')}-ALLRIGHTSRESERVED-COPYRIGHT:JPVILLALON </Typography>
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
          <img src='/assets/images/bg-dots-top-01.png' style={{ position: 'absolute', top: 40, width: '248px', height: '12px' }} alt="Center three dots" />
          <Box sx={{display:'flex', flexDirection:'row', gap:5, alignItems:'center'}}>
            <Box sx={{w:'120px', h:'120px', aspectRatio:'1/1'}}>
              <img src='/assets/images/bg-largebox-01.png'/>
            </Box>
          <Typography variant='h1' component='h1' color={"primary"}
            sx={{ letterSpacing: 10, fontSize: '128px' }}>WELCOME</Typography>
          </Box>
          <Box>
            <List>
              { mainDescription.map((description, index) => {
                return (
                  <ListItem key={index} sx={{maxWidth: '66ch'}}>
                    <ListItemIcon><img src='/assets/images/bg-smallbox-01.png'/></ListItemIcon>
                    <ListItemIcon><img src='/assets/images/bg-plus-01.png'/></ListItemIcon>
                    <Typography variant="body1">{description}</Typography>
                  </ListItem>
                )
              })
              }
            </List>
          </Box>
          <img src='/assets/images/bg-dots-bottom-01.png' style={{ position: 'absolute', bottom: 40, width: '400px', height: '12px' }} alt="Center three dots" />
        </Box>
        <Box
          component='footer'
          sx={{
            h: '100%',
            w: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between'
        }}>
          
        </Box>
      </Box>
  )
}