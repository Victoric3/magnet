import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Style from './rotatingCard.css'; 
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const RotatingCard = (props) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`glassy-card ${flipped ? 'flipped' : ''}`} onClick={handleCardClick} style={Style}>
      <Card className={`card-child ${flipped ? 'flipped' : ''}`}>
        <CardContent className= "card-content">
          <Typography 
          variant="h1" 
          className={`content-title ${flipped ? 'flipped' : ''}`}
          sx={{
            color: props.FrontContent.titleColor,
            background: props.FrontContent.titleBackground
          }}
          >
            { props.FrontContent.title }
          </Typography>
          <div className="content-icons">
          {flipped ? '' : 
           <img className='img-display' src={ props.FrontContent.imgString }
           alt={ props.FrontContent.altString } style={{
               width: 'auto',
               height: '220px',
               display: 'block',
               marginBottom: '15px'
           }}/>
          }
            
            <Typography variant="h3" className={`description ${flipped ? 'back' : 'front'}`} sx={{textAlign: 'start'}}>
            {flipped ?  props.BackContent.description1  :  props.FrontContent.description }
            </Typography>
            <Typography variant="h3" className={`description ${flipped ? 'back' : 'front'}`} sx={{textAlign: 'start'}}>
            {flipped ?  props.BackContent.description2?props.BackContent.description2:''  :  '' }
            </Typography>
          </div>
          <Button className={`description ${flipped ? 'back' : 'front'}`} sx={{
            color: props.FrontContent.titleBackground,
            fontSize: 25, 
            }} onClick={props.FrontContent.ExploreFunction? props.FrontContent.ExploreFunction : () => {}}> 
            Explore Now <TrendingFlatIcon sx={{marginTop: '5px', fontSize: '50px'}}/>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RotatingCard;
