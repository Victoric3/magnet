import React from "react";
import shoe from '../../img/shoe.png'
import { Typography } from "@mui/material";

const ProductCard = ({ imageUrl, name, price }) => {
    const imgStyle = {
        width: '180px',
        height: 'auto'
    }
    const cardStyle = {
        width: '190px',
        height: '230px',
        borderRaduis: '10px',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return ( 
    <>
    <div style={cardStyle}>
        <img src={shoe} alt="product" style={imgStyle}></img>
        <Typography variant="h3" sx={{color: '#333', fontWeight: '400'}}> {name} </Typography>
        <div style={{
            background: '#ff3811', 
            width: '90%', 
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0px auto'
            }}>
        <Typography variant="h3" sx={{color: 'white', fontWeight: '400'}}> {price} </Typography>

        </div>
    </div>
    
    
    
    
    </> );
}
 
export default ProductCard;