import React from "react";
import { useAuth } from './utilities/AuthContext';
import { Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Padding } from "@mui/icons-material";
import ProductCard from "./utilities/productSquareCard";



const MyPshop = () => {
    const { updateAuth, userData, token, isLoggedIn, shopData } = useAuth();
    // console.log(shopData, shopData?.shopBannerUrl);
    
    const style ={ 
    backgroundImage: `url(${shopData?.shopBannerUrl})`,
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center',
    width: '100%',
    height: '70vh',
    marginTop: '90px',
    borderRaduis: '5px'
}
const textStyle = {
    position: 'absolute',
    top: '35%',
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    color: 'white', 
    textAlign: 'center', 
    textTransform: 'capitalize',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };
  const iconStyle = {
    right: '0%',
    position: 'absolute',
    top: '70%', 
    gap: '5px',
    display: 'flex',
    justifySelf: 'end',
    paddingRight: '10px',

}
    const locationStyle= {
        right: '0%',
        position: 'absolute',
        top: '75%', 
        color: 'white', 
        textTransform: 'capitalize',
        paddingRight: '10px',


    }
    const productContainer = {
        display: 'flex',
        flexShrink: 'none',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '30px',
        justifyContent: 'center'
    }

    return ( 
    <>
    <div>
    <div style={style}>
    <div style={{
        width: '100%',
        height: '100%',
        background: '#000',
        opacity: 0.6
    }}></div>
    <div style={textStyle}>
    <Typography variant="h2" sx={{fontWeight: '400'}}>{shopData?.name}</Typography>
    <Typography variant="h1" sx={{fontWeight: '700'}}>{shopData?.shopCatchPhrase}</Typography>
    <Typography variant="h3" sx={{fontWeight: '300'}}>{shopData?.shopOverview}</Typography>
    </div>
    <div style={iconStyle}>
        <FacebookIcon sx={{ color: '#3b5998' }} fontSize="large"/>
        <InstagramIcon sx={{ color: '#F8334A' }} fontSize="large" />
        <TwitterIcon sx={{ color: '#1DA1F2' }} fontSize="large"/>
        <LinkedInIcon sx={{ color: '#0e76a8' }} fontSize="large"/>
        <EmailIcon sx={{ color: '#EA4335' }} fontSize="large"/>
    </div>
    <div style={locationStyle}>
        <Typography variant="h3" sx={{fontWeight: '500'}}>{shopData?.location}</Typography>
    </div>
    </div>
    <div style={productContainer}>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>
    <ProductCard imageUrl='///' name='Nike' price={userData.currencySymbol+ "0"}/>

    </div>
    </div>
    
    </> );
}
 
export default MyPshop;