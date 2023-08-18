import { Route, Routes } from 'react-router-dom';
import './App.css';
import CenteredFormComponent from './components/form';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/utilities/theme'
import Home from './components/home';
import Header from "../src/components/header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={ <CenteredFormComponent />} />
       
      </Routes>
    </ThemeProvider>
  
  );
}

export default App;
