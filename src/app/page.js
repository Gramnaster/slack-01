// import { redirect } from 'next/navigation';
// import Navigation from "@/components/Navigation/Navigation";
import { Box, Paper } from "@mui/material";
// import Link from "next/link";
import Background from '../../public/assets/images/bg-welcome-01.png';
// import { SessionProvider } from "next-auth/react";
// import { TopLeft } from '../../public/assets/images/bg-corner-topleft-01.png';
// import BotLeft from '../../public/assets/images/bg-corner-bottomleft-01.png';
// import TopRight from '../../public/assets/images/bg-corner-topright-01.png';
// import BotRight from '../../public/assets/images/bg-corner-bottomright-01.png';

export default function RootPage() {
  // By default, redirect logged-in users to a general channel.
  // The middleware already ensures only authenticated users can see this.
  // redirect('/login');

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
          display: 'flex'
      }}>
        <Box
          component='header'
          sx={{
            h: '100%',
            w: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between'
        }}>
          <img src='/assets/images/bg-corner-topleft-01.png' style={{ position: 'absolute', top: 40, left: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
          <img src='/assets/images/bg-corner-topright-01.png' style={{ position: 'absolute', top: 40, right: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
        </Box>
        <Box
          component='section'
          sx={{
            flex: 1,
            w: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box>
            Welcome Section
          </Box>
          <Paper>
            Login Section
          </Paper>
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
          <img src='/assets/images/bg-corner-bottomleft-01.png' style={{ position: 'absolute', bottom: 40, left: 40, width: '40px', height: '40px' }} alt="Bottom left corner design" />
          <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Bottom right corner design" />
        </Box>
      </Box>
  )
}