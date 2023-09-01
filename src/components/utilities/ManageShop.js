import { Typography } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import './ManageShop.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
// import EditIcon from '@mui/icons-material/Edit';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';


const ManageShop = ({ productCount, seenBy, MagnetsAttached, Delivered, Orders, Pending,type, image, shopId }) => {
    const navigate = useNavigate()
    
    const { updateAuth, userData, token, isLoggedIn } = useAuth();
    const handleShopClick = async (shopId) => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/shops/${shopId}`,
            {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );
          const data = await response.json();
          const shopData = data.shopData
          updateAuth(userData, isLoggedIn, token,shopData);
          navigate('/myPshop')
        } catch (error) {
          console.error('Error fetching shop data:', error);
        }
    
      };

    return ( 
    <>
        <div className="manage-shop-wrapper">
        <div className="manage-shop-items">
            <div className="manage-shop-Banner">
                <img src={image} alt={'visit shop'} className="manage-shop-img" />
        <div className="manage-overlay">
            <Link onClick={() => {handleShopClick(shopId)}} className="link">
            Visit shop 
            </Link>
        </div>
         </div>
        <div className="manage-icon-div">
        <AddIcon sx={{fontSize: '40px', cursor: 'pointer'}}  onClick={() => {navigate('/CreateProduct')}}/>
        <EditCalendarIcon sx={{fontSize: '40px', cursor: 'pointer'}} />
        </div>
        <div className="manage-shop-flex">
            <Typography variant="h3">All products</Typography>
            <Typography variant="h4">{productCount}</Typography>
        </div>
        
        <div className="manage-shop-flex">
            <Typography variant="h3">views</Typography>
            <Typography variant="h4">{seenBy}</Typography>
        </div>
        <div className="manage-shop-flex">
            <Typography variant="h3">Orders</Typography>
            <Typography variant="h4">{Orders}</Typography>
        </div>
        <div className="manage-shop-flex">
            <Typography variant="h3">Delivered</Typography>
            <Typography variant="h4">{Delivered}</Typography>
        </div>
        <div className="manage-shop-flex">
            <Typography variant="h3">Pending</Typography>
            <Typography variant="h4">{Pending}</Typography>
        </div>
        <div className="manage-shop-flex">
            <Typography variant="h3">Type</Typography>
            <Typography variant="h4">{type}</Typography>
        </div>
        <div className="manage-shop-flex">
            <Typography variant="h3">Magnets</Typography>
            <Typography variant="h4">{MagnetsAttached}</Typography>
        </div>

    </div>



    </div>
    
    </> 
    );
}
 
export default ManageShop;