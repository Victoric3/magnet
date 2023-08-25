import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/signUp';
import SignInForm from './components/signIn';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/utilities/theme'
import Home from './components/home';
import Header from "../src/components/header";
import MsgCard from './components/utilities/msgCard';
import { useState } from 'react';
import { AuthProvider } from './components/utilities/AuthContext';
import Pshop from './components/pShop'
import DashBoard from './components/DashBoard';
import CreateShop from './components/createShop';
import CreateProduct from './components/createProduct';
import PshopPersonal from './components/pShopPersonal';


function App() {

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showmsg, setShowmsg] = useState(false)
  const handleMsgCollector = (Error, Success) => {
    setError(Error);
    setSuccess(Success);
  };
  const messageShower = (boolean) => {
      setShowmsg(boolean)
  }
  const handleOkClick = () => {
    setShowmsg(false)
  }


  return (
    <div className='app-container'>
    
   <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/* <CurrentUserData handleUserDataCollector={handleUserDataCollector}/> */}
      {error && <MsgCard errorMessage={error} handleOkClick={handleOkClick} showmsg={showmsg}/>}
      {success && <MsgCard success={success} handleOkClick={handleOkClick} showmsg={showmsg}/>}
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUp' element={ <SignUpForm handleMsgCollector={handleMsgCollector} messageShower={messageShower}/>} />
        <Route path='/signIn' element={ <SignInForm 
        handleMsgCollector={handleMsgCollector} 
        messageShower={messageShower}/>} 
        />
        <Route path='/shop/Pshop' element={ <Pshop handleMsgCollector={handleMsgCollector} messageShower={messageShower}/>} />
        <Route path='/DashBoard' element= {<DashBoard />} />
        <Route path='/CreateShop' element= {<CreateShop />} />
        <Route path='/CreateProduct' element= {<CreateProduct />} />
        <Route path='/PshopPersonal' element= {<PshopPersonal />} />
       </Routes>
    </ThemeProvider>
    </AuthProvider>
    </div>
  
  );
}

export default App;
