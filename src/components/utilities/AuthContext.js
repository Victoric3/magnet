import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState();
  const [shopData, setShopData] = useState();
  

  const updateAuth = (userData, isLoggedIn, newToken, shopData) => {
    setUserData(userData);
    setIsLoggedIn(isLoggedIn)
    setToken(newToken)
    setShopData(shopData)
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserData(null)
  };

  const value = { isLoggedIn, userData,token, updateAuth, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
