import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const RootBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme => theme.palette.grey[200],
});

const ShopBannerBox = styled(Box)({
  width: '80%',
  textAlign: 'center',
  position: 'relative',
});

const ShopImage = styled('img')({
  maxWidth: '100%',
  display: 'block',
  margin: '0 auto',
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
});

function ShopBanner(shopImg) {
  return (
    <RootBox>
      <ShopBannerBox>
        <ShopImage
          src={shopImg}
          alt="Shop Image"
        />
      </ShopBannerBox>
    </RootBox>
  );
}

export default ShopBanner;
