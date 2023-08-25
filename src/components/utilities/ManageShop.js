import { Typography } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from'@mui/material';
import './ManageShop.css';
import shopBanner from "../../img/E-shop.jpg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const ManageShop = ({ productCount, seenBy, MagnetsAttached, Delivered, Orders, Pending,type }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()

    return ( 
    <>
    <div className="manage-shop-wrapper">
    <Typography variant="h2" className="manage-title" fontWeight={400}>
        Manage your shops here
    </Typography>
    <div className="manage-shop-items">
        <div className="manage-shop-Banner">
        <img src={shopBanner} alt={'visit shop'} className="manage-shop-img" />
      <div className="manage-overlay">
        <Link to={'/'} className="link">
          Visit Link 
        </Link>
      </div>

        </div>
        <AddIcon sx={{fontSize: '40px', cursor: 'pointer'}}  onClick={() => {navigate('/PshopPersonal')}}/>
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