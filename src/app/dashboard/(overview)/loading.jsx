import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  // You can add a skeleton screen here for a better UX
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#1D1D1D'
      }}
    >
      <CircularProgress color="primary" />
      <Typography sx={{ mt: 2, color: 'primary.main' }}>
        Loading Dashboard...
      </Typography>
    </Box>
  );
}