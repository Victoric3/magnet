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
      primary: '#333',
      secondary: '#333333',
      special: '#007bff'
    },
    background: {
      default: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 912,
      lg: 1040,
      xl: 1400,
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57
    },
    button: {
      fontWeight: 700,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    h1: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2
    },
    h2: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2
    },
    h3: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2
    },
    h4: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2
    },
    h5: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2
    },
    h6: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2
    }
    }});

export default theme;
