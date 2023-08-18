import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#ff3811',
    },
    tetiary: {
      main: '#00214d',
    },
    text: {
      primary: '#333333',
    },
    background: {
      default: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 940,
      md: 1060,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,

    // Define custom typography variants
    h1: {
      fontSize: 35,
      '@media (max-width: 600px)': {
        fontSize: 30,
      },
    },
    h2: {
      fontSize: 30, 
      '@media (max-width: 600px)': {
        fontSize: 25,
      }, 
    },
    h3: {
      fontSize: 25,
      '@media (max-width: 600px)': {
        fontSize: 20,
      }, 
    },
    h4: {
      fontSize: 20,
      '@media (max-width: 600px)': {
        fontSize: 16,
      }, 
    },
    button: {
        textTransform: 'capitalize', 
        fontSize: 20, 
        '@media (max-width: 600px)': {
          fontSize: 16,
        }, 
      },
    }});

export default theme;
