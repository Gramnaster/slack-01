'use client';
import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  typography: {
    fontFamily: [
      'var(--font-jetbrains-mono)',
      'var(--font-roboto-mono)',
      'monospace'  // Fallback
    ].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#FF7300',
    },
    secondary: {
      main: '#B5FF3B',
    },
    background: {
      default: '#120800',
      paper: '#251A13',
    },
    text: {
      primary: '#FF7300',
      secondary: '#FF7300',
      disabled: '#FF7300',
    },
    error: {
      main: '#FF0307',
    },
    warning: {
      main: '#FF0BFF',
    },
    divider: '#FF7300',
  },
});

// themeOptions.typography.h1 = {
//   fontSize: '128px',
//   '@media (min-width:720px)': {
//     fontSize: '64px',
//   },
//   // [themeOptions.breakpoints.up('md')]: {
//   //   fontSize: '64px',
//   // },
// };

export default themeOptions;