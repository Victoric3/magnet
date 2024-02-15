import React from 'react';
import Layout from './shopLayout';
import {Typography, useMediaQuery}  from '@mui/material'
import ShopBanner from './shopBanner';
import CategoryCard from './categoryCard';
import { psample } from '../utilities/formLists';
import image1 from '../../img/thomas-and-friends-2435542_1280.jpg'
import image2 from '../../img/shop.jpg'
import image3 from '../../img/laptop-1205256_1920.jpg'
import image4 from '../../img/kicks-2213619_640.jpg'
import image5 from '../../img/kitchen-3496594_1280.jpg'
import image6 from '../../img/smart-watch-821557_1920.jpg'
// import ProductCard from './productCard';

//         "Toys & Games",
//         "Clothing & Fashion",
// "Electronics & Gadgets",
//         "Shoes & Footwear",
//         "Home & Living",
//         "Watches & Accessories"
const Pshop = () => {
    // const { messageShower, handleMsgCollector, updateAuth } = useAuth()
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isAvgScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    // const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    // const isNexhubtMax = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const categoryImages = [image1, image2, image3, image4, image5, image6]
    return ( 
    <>
    <Layout sx={{padding: 0}}>
        <div style={{
            height: isMobile? '260px' : isAvgScreen? '380px' : '480px',
        }}>
        <ShopBanner />
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
        }}>
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: isAvgScreen? '0px' : '60px',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
        {psample.map((sample, index) =>
            <CategoryCard 
            imageUrl={categoryImages[index]} 
            categoryName={sample}
            />
        )}
        </div>
        <Typography variant='body1'>{`SEE ALL CATEGORIES >`}</Typography>
        </div>
        <div style={{
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
        }}>
            {/* <Typography variant='h5'>Best deals</Typography> */}
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: isAvgScreen? '0px' : '60px',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
        {psample.map((sample, index) =>
            <CategoryCard 
            imageUrl={categoryImages[index]} 
            categoryName={sample}
            />
        )}
        </div>
        <Typography variant='body1'>{`SEE ALL DEALS >`}</Typography>
        </div>
        
        
    </Layout>
    </> );
}


export default Pshop;