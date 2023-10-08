import React, { useState, useEffect } from 'react';
import image7 from '../../img/samos-997876_1920.jpg'
import image8 from '../../img/girl-2581913_1280.jpg'
import image3 from '../../img/thomas-and-friends-2435542_1280.jpg'
import image1 from '../../img/child-817373_1280.jpg'
import image4 from '../../img/apparel-1850804_1280.jpg'
import image2 from '../../img/laptop-1205256_1920.jpg'
import image6 from '../../img/kitchen-1940177_1280.jpg'
import image5 from '../../img/shop.jpg'
import { textData } from './bannerTextData'
import {Typography, useMediaQuery}  from '@mui/material'

const images = [image1,image2, image3, image4, image5, image6, image7, image8]; 

function ShopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isAvgScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isNexhubtMax = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  const maxDotsToShow = 3;
  const startDotIndex = Math.max(0, currentIndex - Math.floor(maxDotsToShow / 2));
  const endDotIndex = Math.min(images.length - 1, startDotIndex + maxDotsToShow - 1);

  const typographyStyle = {
    opacity: isVisible ? 1 : 0,
    color: 'white',
    background: 'none',
    transition: 'opacity 1.5s ease-in-out',
    position: 'absolute',
    width: '100%',
    height: isMobile? '280px' : isAvgScreen? '400px' : '500px',
    display: 'flex',
    alignItems: isMobile? 'left' : 'center',
    justifyContent: 'center',
    paddingLeft: isMobile? '5px' : isAvgScreen? '15px' : '60px',
    flexDirection: 'column'
  };


  return (
    <div
      style={{
        width: isLargeScreen? '100%' : isNexhubtMax? '81.25%' : '84.37%',
        // height: 'auto',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: isMobile? '280px' : isAvgScreen? '400px' : '500px',
          background: 'black',
          opacity: 0.4
        }}  
      ></div>
      <div style={typographyStyle}>
      <Typography variant='h5'>
        {textData[currentIndex].heading}
      </Typography>
        
      <Typography variant='body1'>
        {textData[currentIndex].body}
      </Typography>
      </div>
      <img
        style={{
          width: '100%',
          height: isMobile? '280px' : isAvgScreen? '400px' : '500px',
          animation: 'fade 5s infinite',
          transition: 'opacity 1s',
        }}
        src={images[currentIndex]}
        alt={`banner ${currentIndex + 1}`}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {images.slice(startDotIndex, endDotIndex + 1).map((_, index) => (
          <div
            key={startDotIndex + index}
            onClick={() => handleDotClick(startDotIndex + index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: startDotIndex + index === currentIndex ? '#ff3811' : '#bbb',
              margin: '0 5px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopBanner;
