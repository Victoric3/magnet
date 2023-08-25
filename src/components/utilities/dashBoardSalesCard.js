import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './dashBoardSalesCard.css'; // Add your custom styles here

const SquareCard = ({ title, content, colorIdentification }) => {
  return (
    <div>
    <Card className="reusable-card">
      <CardContent className='card-content'>
        <div className='title-cont'>
        <div className='color-identification' style={{background: `${colorIdentification}`}}></div>
        <div className='title-space'></div>
        <Typography variant="h4" gutterBottom>
          {title} 
        </Typography>
        </div>
        <Typography variant="h3" color="textSecondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default SquareCard;
