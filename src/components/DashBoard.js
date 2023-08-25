import React from "react";
import { useAuth } from './utilities/AuthContext';
import SquareCard from "./utilities/dashBoardSalesCard";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './utilities/DashBoard.css'
import { useNavigate } from "react-router-dom";
import BalanceCard from './utilities/balanceCard'; 
import { Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ManageShop from "./utilities/ManageShop";





const DashBoard = () => {
    const { isLoggedIn, logout, userData } = useAuth();
    const navigate = useNavigate()
    const currentBalance = 5000; // Example value
    const pendingBalance = 1500; 
    const currency = '$'
    //productCount, seenBy, MagnetsAttached, Delivered, Orders, Pending
    const shopData ={
      productCount: 20,
      seenBy: 10,
      MagnetsAttached: 15,
      Delivered: 12,
      Orders: 18,
      Pending: 10,
      type: 'E-shop'
    }
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
        <PersonOutlineIcon sx={{ 
          fontSize: '35px', 
          border: '1px solid #333', 
          borderRadius: '50%', 
          padding: '5px',
          }}/>
          <Typography>Hi, victor</Typography>
          <div className="top-nav-gap"></div>
          <SupportAgentIcon sx={{cursor: 'pointer'}} />
          <NotificationsNoneIcon sx={{cursor: 'pointer'}}/>
          <AddIcon sx={{cursor: 'pointer'}} onClick={() => {navigate('/CreateShop')}}/>
          <SettingsIcon sx={{cursor: 'pointer'}}/>
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
        <ManageShop 
        productCount={shopData.productCount} 
        seenBy={shopData.seenBy}
        MagnetsAttached={shopData.MagnetsAttached}
        Delivered={shopData.Delivered}
        Orders={shopData.Orders}
        Pending={shopData.Pending}
        type={shopData.type}
        />
    
    </div> 
    )
}
 //    //productCount, seenBy, MagnetsAttached, Delivered, Orders, Pending

export default DashBoard;