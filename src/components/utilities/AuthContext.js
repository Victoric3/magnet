import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token")
  const [shopData, setShopData] = useState();
  const currentShopData = JSON.parse(localStorage.getItem("currentShopData"))
  const [shopProductData, setShopProductData] = useState();
  const [allProductData, setAllProductData] = useState();
  const [currentProductData, setCurrentProductData] = useState();
  const [showPopUp, setShowPopUp] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [showmsg, setShowmsg] = useState(false)

  const handleMsgCollector = (error, success) => {
    setError(error);
    setSuccess(success);
  };
  const messageShower = (boolean) => {
      setShowmsg(boolean)
  }
  const handleOkClick = () => {
    setShowmsg(false);
  }

  

  const updateAuth = (userData, shopData) => {
    setUserData(userData);
    setShopData(shopData)
  };
  
  const updateProductData = (allProductData, shopProductData, currentProductData) => {
    setAllProductData(allProductData)
    setShopProductData(shopProductData)
    setCurrentProductData(currentProductData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUserData(null)
    navigate('/signIn')
  };
  const updateShowPopUp = (Boolean) => {
    setShowPopUp(Boolean)
  }

  const value = { 
    userData, 
    token, 
    updateAuth, 
    shopData, 
    currentShopData,
    logout, 
    updateProductData,
    currentProductData,
    shopProductData,
    allProductData,
    showPopUp,
    updateShowPopUp,
    handleOkClick,
    messageShower,
    handleMsgCollector,
    showmsg,
    success,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
