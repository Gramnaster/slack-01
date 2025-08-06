import { Box, Container, Typography } from '@mui/material';

export default function MainPage() {
  return (
    <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'center', height:'100%', width:'100%'}}>
      <Container sx={{position:'relative', display:'flex', justifyContent:'center', alignItems:'center', alignContents:'center', alignSelf:'center', textAlign: 'center',}}>
        <Typography variant='body2'> {/* eslint-disable-next-line */}
          Welcome to Miscord's Homepage
        </Typography>
      </Container>
    </Box>
  )
}
