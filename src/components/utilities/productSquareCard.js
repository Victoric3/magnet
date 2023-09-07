import React, { useEffect } from "react";
import { Hidden, Typography } from "@mui/material";
import './productSquareCard.css';
import { useAuth } from './AuthContext'

const ProductCard = ({ imageUrl, name, orgPrice, discountPrice, productData }) => {
    const {
        updateShowPopUp, 
        showPopUp, 
        updateProductData, 
        currentProductData, 
        shopProductData, 
        allProductData,
        token
    } = useAuth()

    const handleClick = (productData => {
        updateProductData(allProductData, shopProductData, productData)
        updateShowPopUp(!showPopUp)
      }
    )
    return ( 
    <>
    <div className="card-style"
       onClick={() => {
        handleClick(productData)
    }}
    >
        <img src={imageUrl} alt="product" className="img-style"></img>
        <Typography variant="h3" sx={{
            color: '#333', 
            fontWeight: '400', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            width: '90%'
            }}> {name} </Typography>

        <div style={{
            height: '80px',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '8px',
            alignSelf: 'start',
            textOverflow: 'hidden',
            }}>
        <Typography variant="h3" sx={{color: '#333', fontWeight: '400'}}> {discountPrice} </Typography>
        <Typography variant="h4" sx={{
            color: '#333', 
            fontWeight: '400', 
            textDecoration: 'line-through', 
            textDecorationThickness: '1px'
            }}> {orgPrice} </Typography>

        </div>
    </div>
    
    
    
    
    </> );
}
 
export default ProductCard;