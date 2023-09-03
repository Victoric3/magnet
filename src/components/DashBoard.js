import React, { useEffect, useState } from "react";
import { useAuth } from './utilities/AuthContext';
import SquareCard from "./utilities/dashBoardSalesCard";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './utilities/DashBoard.css'
import { Link, useNavigate } from "react-router-dom";
import BalanceCard from './utilities/balanceCard'; 
import { Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ManageShop from "./utilities/ManageShop";





const DashBoard = () => {
  const { updateAuth, userData, token, isLoggedIn, shopData } = useAuth();
  const navigate = useNavigate()
  const numbers1 = userData?.transaction;
  const numbers2 = userData?.pendingBalance;
  const totalBalance = numbers1?.reduce((acc, current) => acc + current, 0);
  const totalPending = numbers2?.reduce((acc, current) => acc + current, 0);
  const calculateTotal = array => {
    return array?.reduce((total, value) => total + value, 0);
  };
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/shops/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      updateAuth(userData, isLoggedIn, token, data.shopData)
      console.log(shopData);
    })
    .catch(error => {
      console.error('Error fetching shop data, please login or reload the page')
    });
  }, [userData?._id]);
    const currentBalance = totalBalance; // Example value
    const pendingBalance = totalPending; 
    const currency = userData?.currencySymbol
    //productCount, seenBy, MagnetsAttached, Delivered, Orders, Pending
   
    const SquareCardData = [
     {title: '10', content: 'Daily visits', color: '#66ff66'},
     {title: '1021', content: 'Daily sales', color: '#ff66ff'},
     {title: '5.0', content: 'Rating', color: '#8080ff'},
     {title: '80k', content: 'Total visits', color: '#00cc00'},
     {title: '100k', content: 'Total sales', color: '#e600e6'},
     {title: '100k', content: 'Raters', color: '#007bff'}
  
                            ]
    return ( 
    <div className="dashBoard-wrapper">
      <div className="topNav">
        <div className="top-nav-one">
        <PersonOutlineIcon sx={{ 
          fontSize: '35px', 
          border: '1px solid #333', 
          borderRadius: '50%', 
          padding: '5px',
          }}/>
          <Typography>Hi, {userData?.firstName}</Typography>
          </div>
          <div className="top-nav-two">
          <SupportAgentIcon sx={{cursor: 'pointer'}} />
          <NotificationsNoneIcon sx={{cursor: 'pointer'}}/>
          <AddIcon sx={{cursor: 'pointer'}} onClick={() => {navigate('/CreateShop')}}/>
          <SettingsIcon sx={{cursor: 'pointer'}}/>
          </div>
      </div>
      <div className="dashBoard">
        <div className= 'balance'>
        <BalanceCard currentBalance={currentBalance} pendingBalance={pendingBalance} currency={currency} />
        </div>
        <div className='dash-square-card'>
        <SquareCard title= {SquareCardData[0].title} content= {SquareCardData[0].content} colorIdentification={SquareCardData[0].color}/>
        <SquareCard title= {SquareCardData[1].title} content= {SquareCardData[1].content} colorIdentification={SquareCardData[1].color}/>
        <SquareCard title= {SquareCardData[2].title} content= {SquareCardData[2].content} colorIdentification={SquareCardData[2].color}/>
        <SquareCard title= {SquareCardData[3].title} content= {SquareCardData[3].content} colorIdentification={SquareCardData[3].color}/>
        <SquareCard title= {SquareCardData[4].title} content= {SquareCardData[4].content} colorIdentification={SquareCardData[4].color}/>
        <SquareCard title= {SquareCardData[5].title} content= {SquareCardData[5].content} colorIdentification={SquareCardData[5].color}/>
        </div>
      </div>
      <div className="manage-shop-container">
      <Typography variant="h3" sx={{marginLeft: '15px'}} fontWeight={600}>
          Manage your shops here
      </Typography>
      
      
      {shopData?.length > 0  ? shopData?.map(shop => (
        <ManageShop
          key={shop?._id}
          productCount={shop?.products.length}
          seenBy={calculateTotal(shop?.seenBy)}
          MagnetsAttached={calculateTotal(shop?.MagnetsAttached)}
          Delivered={calculateTotal(shop?.Delivered)}
          Orders={calculateTotal(shop?.Orders)}
          Pending={calculateTotal(shop?.pending)}
          type={shop?.shopType}
          image={shop.shopImgUrl}
          shopId = {shop?._id}
          shopData = {shop}
        />
      )) :
        <Typography variant="h4" sx={{
          fontWeight: '500',
          color: '#333',
          textAlign: 'center',
          marginTop: '100px'
        }}> you don't have any shop at the moment <span style={{display: 'block'}}><Link to='/CreateShop'>
          create shop here
          </Link></span></Typography>

      }

      </div>

      
    
    </div> 
    )
}
 //    //productCount, seenBy, MagnetsAttached, Delivered, Orders, Pending

export default DashBoard;