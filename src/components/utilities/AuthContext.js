import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate("currentProductData")
  // let userData
  // let currentShopData
  // let currentProductData
//   if(localStorage.getItem("userData") === undefined){
//     localStorage.removeItem("userData")
//   }
//   if(localStorage.getItem("currentShopData") === undefined){
//     localStorage.removeItem("currentShopData")
//   }
//   if(localStorage.getItem("currentProductData" === undefined)){
//     localStorage.removeItem("currentProductData")
// }
  const userData = JSON.parse(localStorage.getItem("userData"))
  const currentShopData = JSON.parse(localStorage.getItem("currentShopData"))
  const currentProductData = JSON.parse(localStorage.getItem("currentProductData"))
  const token = localStorage.getItem("token")
  const [shopData, setShopData] = useState();
  const [shopProductData, setShopProductData] = useState();
  const [allProductData, setAllProductData] = useState();
  const [showPopUp, setShowPopUp] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [showmsg, setShowmsg] = useState(false)
  const development = true
  const baseUrl = (finalEndPoint) => {
    if(development){
      return `http://localhost:8000/api/v1/${finalEndPoint}`
    }else{
      return `https://alphamagnet3-api.onrender.com/api/v1/${finalEndPoint}`

    }
  }

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

  

  const updateAuth = ( shopData) => {
    setShopData(shopData)
  };
  
  const updateProductData = (allProductData, shopProductData) => {
    setAllProductData(allProductData)
    setShopProductData(shopProductData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('userData')
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
    error,
    baseUrl
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
