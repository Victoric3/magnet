import { Route, Routes } from 'react-router-dom';
import './App.css';
import CenteredFormComponent from './components/form';
import { ThemeProvider, Box, CssBaseline, Container } from '@mui/material';
import theme from './components/utilities/theme'
import Home from './components/home';
import Header from "../src/components/header";

function App() {
  return (
    <Box
         sx={{ 
           display: 'flex',
           justifyContent: 'center',
           minHeight: '100vh',  
          }} 
    >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container 
      sx={{
        width: '85%',
        marginTop: '100px',
        '@media (max-width: 600px)': {
          width: '100%', 
        }
    }}
      >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={ <CenteredFormComponent />} />
       
      </Routes>
      </Container>
    </ThemeProvider>
  
    </Box>
  );
}

export default App;
