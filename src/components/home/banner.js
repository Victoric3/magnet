import React, { useState, useEffect } from 'react';
import { bannerTextData } from './formLists';
import {Typography, useMediaQuery, Button}  from '@mui/material'
import { useNavigate } from 'react-router-dom';


function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate()
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerTextData.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);



  
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  const maxDotsToShow = bannerTextData.length;
  const startDotIndex = Math.max(0, currentIndex - Math.floor(maxDotsToShow / 2));
  const endDotIndex = Math.min(bannerTextData.length - 1, startDotIndex + maxDotsToShow - 1);


  return (
    <>
    <div style={{
        width: '100%',
        background: '#ff3811',
        display: isMobile? '' : 'flex',
        height: 'auto',
        justifyContent: 'center',
        paddingTop: '120px',
        flexDirection: 'column'
        }}>
    <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        margin: isMobile ? '0%' : '0% 5%',
        alignItems: 'center',
        alignSelf: 'center',
        padding: isMobile ? '0 10px' : '0',
        gap: isMobile? "10px" : "40px",
        justifyContent: isMobile? 'center' : 'space-between',
    }}>

      <div style={{ 
          display: 'flex',
          flexDirection: "column",
          gap: '10px',
          maxWidth: isMobile? '100%' : '50%'
        }}>
        <Typography variant='h5' sx={{color:"#e0e0e0"}}>
          {bannerTextData[currentIndex].title}
        </Typography>
        <Typography variant='h3' sx={{color:"#ff7a47"}}>
          {bannerTextData[currentIndex].caption}
        </Typography>
        <Typography variant='h5' color='#e0e0e0'>
          {bannerTextData[currentIndex].description}
        </Typography>
        <Button variant="contained" onClick={() => {navigate('/signUp')}} sx={{borderRadius: '0% 50%',  color:"#e0e0e0", padding: '20px', width: '130px', background: '#ff7a47'}}>
          Get Started
        </Button>
      </div>
      <img
        style={{
          width: isMobile? "100%" : "600px",
          height: isMobile ? "auto" : "400px",
          animation: 'fade 5s infinite',
          transition: 'opacity 1s',
          borderRadius: '50px',
        }}
        src={bannerTextData[currentIndex].image}
        alt={`banner ${currentIndex + 1}`}
      />
    </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {bannerTextData.slice(startDotIndex, endDotIndex + 1).map((_, index) => (
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
            </>      
  );
}

export default Banner;
