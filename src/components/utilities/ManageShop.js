import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './ManageShop.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import AddIcon from '@mui/icons-material/Add';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import ConfirmationModal from "./confirmationModal";

const ManageShop = ({ 
  productCount,
  seenBy, 
  MagnetsAttached, 
  Delivered, 
  Orders, 
  Pending,
  type, 
  image, 
  shopData,
  totalShopData
}) => {
    const navigate = useNavigate()
    const [showDetails, setShowDetails] = useState(false);
    const { 
      updateAuth, 
      userData, 
      token, 
      currentShopData, 
      handleMsgCollector,
      messageShower,
      baseUrl
    } = useAuth();
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const handleShopClick = (shopData) => {
        localStorage.setItem("currentShopData",  JSON.stringify(shopData))
    };
      const handleAdd = (shopData) => {
        localStorage.setItem("currentShopData",  JSON.stringify(shopData))
          navigate('/CreateProduct')
      }
      
    //confirmation modal
    
  const handleEditShop =(shopData) => {
    localStorage.setItem("currentShopData",  JSON.stringify(shopData))
    navigate('/editShop')    
  }

  //
      return ( 
        <>
        <div className="manage-shop-items">
            <div className="manage-shop-Banner">
        { showDetails && (
        <div className="manage-shop-flex">
          <DisabledByDefaultOutlinedIcon onClick={() => {setShowDetails(!showDetails)}} />
           <ul>
            <li variant="h3">All products: {productCount}</li>
            <li variant="h3">views: {seenBy}</li>
            <li variant="h3">Orders: {Orders}</li>
            <li variant="h3">Delivered: {Delivered}</li>
            <li variant="h3">Pending: {Pending}</li>
            <li variant="h3">Type: {type}</li>
            <li variant="h3">Magnets: {MagnetsAttached}</li>
           </ul>
        </div>
  )}
                <img src={image} alt={'visit shop'} className="manage-shop-img" />
        <div className="manage-overlay">
            <Link onClick={() => {
              handleShopClick(shopData)
              }} className="link" to={'/myPshop'}>
            Visit shop 
            </Link>
        </div>
         </div>
        <div className="manage-icon-div" >
        <AddIcon sx={{fontSize: '35px', cursor: 'pointer'}}  onClick={() => {
          handleAdd(shopData)
          }}/>
        <EditCalendarIcon sx={{fontSize: '35px', cursor: 'pointer'}} onClick={() => {handleEditShop(shopData)}}/>
        <MoreVertIcon sx={{fontSize: '35px', cursor: 'pointer'}} onClick={() => {setShowDetails(!showDetails)}} />
        <DeleteOutlineIcon sx={{fontSize: '35px', cursor: 'pointer'}} onClick={() => {
          openconfirmModal()
          localStorage.setItem("currentShopData",  JSON.stringify(shopData))
        }} />

        
        
        </div>
    </div>



    
    </> 
    );
}
 
export default ManageShop;