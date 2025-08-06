'use client';

import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  typography: {
    fontFamily: [
      'var(--font-jetbrains-mono)',
      'var(--font-roboto-mono)',
      'monospace'
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
          color: '#FF7300 !important',
          '&.Mui-focused': {
            color: '#FF7300 !important',
          },
          '&.Mui-error': {
            color: '#FF0307 !important',
          },
        },
      },
    },
  },
});

export default themeOptions;