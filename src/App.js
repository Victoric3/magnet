import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/userAuth/signUp';
import SignInForm from './components/userAuth/signIn';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/utilities/theme';
import Home from './components/home';
import Header from '../src/components/header';
import MsgCard from './components/utilities/msgCard';
import { AuthProvider, useAuth } from './components/utilities/AuthContext';
import Pshop from './components/pShop';
import Page from './components/dashPrimary'
import CreateShop from './components/myShops/craeteShopPages/createShop';
import CreateProduct from './components/myShops/createProduct/createProduct';
import MyPshop from './components/MyPshop';
import EditMyShop from './components/myShops/craeteShopPages/editShop'
import DeleteProduct from './components/deleteProduct';
import EditProduct from './components/myShops/createProduct/editProduct';
import Tools from './components/tools'
import Myshops from './components/myShops/myShops';
import Account from './components/settings/account/account'  
import useFetchUserData from './components/hooks/useFetchData';


function App() {
  const { error, success,token } = useAuth();
  useFetchUserData(token)
  
  return (
    <div className='app-container'>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {error && <MsgCard />}
          {success && <MsgCard />}
    
          <Routes>
            <Route path='/' element={<><Header /> <Home /></>} />
            <Route path='/signUp' element={<><Header /> <SignUpForm /></>} />
            <Route path='/signIn' element={<SignInForm />} />
            <Route path='/shop/Pshop' element={<Pshop />} />
            <Route path='/DashBoard' element={<Page />} />
            <Route path='/CreateShop' element={<CreateShop />} />
            <Route path='/tools' element={<Tools />} />
            <Route path='/createProduct' element={<CreateProduct />} />
            <Route path='/myPshop' element={<MyPshop />} />
            <Route path='/myShops' element={<Myshops />} />
            <Route path='/editShop' element={<EditMyShop />} />
            <Route path='/editProduct' element={<EditProduct />} />
            <Route path='/deleteProduct' element={<DeleteProduct />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
