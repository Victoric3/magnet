import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
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
      sm: 930,
      md: 1060,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,

    // Define custom typography variants
    h1: {
      fontSize: 36,
      '@media (max-width: 600px)': {
        fontSize: 31,
      },
    },
    h2: {
      fontSize: 28, 
      '@media (max-width: 600px)': {
        fontSize: 23,
      }, 
    },
    h3: {
      fontSize: 20,
      '@media (max-width: 600px)': {
        fontSize: 15,
      }, 
    },
    button: {
        textTransform: 'capitalize', 
        fontSize: 18, 
        '@media (max-width: 600px)': {
          fontSize: 13,
        }, 
      },
  },
  // Other theme properties.
});

export default theme;
