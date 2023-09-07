import React, { useEffect, useState } from "react";
import { useAuth } from './utilities/AuthContext';
import { Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import ProductCard from "./utilities/productSquareCard";
import './utilities/MyPshop.css';
import ProductPopUp from "./utilities/productPopUp";




const MyPshop = () => {
    const { 
        token, 
        currentShopData, 
        updateProductData, 
        currentProductData, 
        shopProductData, 
        allProductData,
        showPopUp
    } = useAuth();
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/products/shop/${currentShopData._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
            updateProductData(allProductData, data.productData, currentProductData)
        })
        .catch(error => {
          console.error('Error fetching shop data, please login or reload the page')
        });
      }, []);
    return ( 
    <>
    <div>
    <div className="style" style={{backgroundImage: `url(${currentShopData?.shopBannerUrl})`}}>
    <div style={{
        width: '100%',
        height: '100%',
        background: '#000',
        opacity: 0.6
    }}></div>
    <div className="text-style">
    <Typography variant="h2" sx={{
        fontWeight: '400',
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        width: '90%'
}}>{currentShopData?.name}</Typography>
    <Typography variant="h1" sx={{
        fontWeight: '700',
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        width: '90%'
        }}>{currentShopData?.shopCatchPhrase}</Typography>
    <Typography variant="h3" sx={{
        fontWeight: '300',
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        width: '90%'
        }}>{currentShopData?.shopOverview}</Typography>
    </div>
    <div className="icon-style">
        <FacebookIcon sx={{ color: '#3b5998' }} fontSize="large"/>
        <InstagramIcon sx={{ color: '#F8334A' }} fontSize="large" />
        <TwitterIcon sx={{ color: '#1DA1F2' }} fontSize="large"/>
        <LinkedInIcon sx={{ color: '#0e76a8' }} fontSize="large"/>
        <EmailIcon sx={{ color: '#EA4335' }} fontSize="large"/>
    </div>
    <div className="location-style">
        <Typography variant="h3" sx={{fontWeight: '500'}}>{currentShopData?.location}</Typography>
    </div>
    </div>
    </div>
    <div className="product-container">
    {shopProductData?.length > 0  ? shopProductData?.map(product => (
    <ProductCard 
    imageUrl={product.imageUrl} 
    name={product?.name} 
    orgPrice={product?.currencySymbol+ product?.price} 
    discountPrice={product?.currencySymbol+ (product?.price - product?.price * product?.discount/100)}
    productData= {product}
/>)): ''}
    </div>
     {showPopUp && <ProductPopUp description={currentProductData?.productOverview} pay=''/>}
    
    </> 
    );
}
 
export default MyPshop;