import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/signUp';
import SignInForm from './components/signIn';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/utilities/theme';
import Home from './components/home';
import Header from '../src/components/header';
import MsgCard from './components/utilities/msgCard';
import { AuthProvider, useAuth } from './components/utilities/AuthContext';
import Pshop from './components/pShop';
import DashBoard from './components/DashBoard';
import CreateShop from './components/createShop';
import CreateProduct from './components/createProduct';
import MyPshop from './components/MyPshop';
import EditMyShop from './components/editShop'


function App() {
  const { error, success } = useAuth();
  return (
    <div className='app-container'>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          {error && <MsgCard />}
          {success && <MsgCard />}
    
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signUp' element={<SignUpForm />} />
            <Route path='/signIn' element={<SignInForm />} />
            <Route path='/shop/Pshop' element={<Pshop />} />
            <Route path='/DashBoard' element={<DashBoard />} />
            <Route path='/CreateShop' element={<CreateShop />} />
            <Route path='/CreateProduct' element={<CreateProduct />} />
            <Route path='/myPshop' element={<MyPshop />} />
            <Route path='/editShop' element={<EditMyShop />} />
          </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
