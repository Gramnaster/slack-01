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
      secondary: '#251A13',
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
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FF7300 !important', // Force all InputLabels to use primary color
          '&.Mui-focused': {
            color: '#FF7300 !important', // Keep primary color when focused
          },
          '&.Mui-error': {
            color: '#FF0307 !important', // Use error color when there's an error
          },
        },
        // body: {
        //   scrollbarColor: "#FF7300 #FF7300",
        //   "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        //     backgroundColor: "#1A1A1A",
        //   },
        //   "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
        //     borderRadius: 8,
        //     backgroundColor: "#FF7300",
        //     minHeight: 24,
        //     border: "1px solid #FF7300",
        //   },
        //   "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
        //     backgroundColor: "#FF7300",
        //   },
        //   "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
        //     backgroundColor: "#FF7300",
        //   },
        //   "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
        //     backgroundColor: "#FF7300",
        //   },
        //   "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
        //     backgroundColor: "#FF7300",
        //   },
        // },
      },
    },
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