import React from 'react';
import {Card, CardContent, Typography, useMediaQuery } from '@mui/material';


const CategoryCard = ({ categoryName, imageUrl }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isAvgScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isNexhubtMax = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  return (
    <Card style={{ 
        maxWidth: isMobile? 180 : isAvgScreen? 220 : isNexhubtMax? 240 : 200,
        padding: '5px',
        margin: isMobile ? 0 : isNexhubtMax ? '0px 10px' : 0
        }}>
      <img src={imageUrl} alt={categoryName} 
      style={{ 
        width: '100%', 
        height: '150px',
      }} />
      <CardContent>
        <Typography variant="body1" component="div"
        sx={{
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          width: '90%'
        }}
        >
          {categoryName}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
