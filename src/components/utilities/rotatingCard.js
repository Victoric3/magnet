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
          variant="h5" 
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
            
            <Typography variant="h5" className={`description ${flipped ? 'back' : 'front'}`} sx={{textAlign:  'start'}}>
            {flipped ?  props.BackContent.description1  :  props.FrontContent.description1 }
            </Typography>
            <Typography variant={flipped? "h5" : "h6"} className={`description ${flipped ? 'back' : 'front'}`} 
            sx={{
              color:  !flipped ? props.FrontContent.titleBackground :'',
              textAlign: 'start', 
              }}>
            {flipped ?  props.BackContent.description2?props.BackContent.description2:''  :  props.FrontContent.description2?props.FrontContent.description2:'' }
            </Typography>
          </div>
          <Typography variant='button' className={`description ${flipped ? 'back' : 'front'}`} sx={{
            color: props.FrontContent.titleBackground,
            cursor: 'pointer'
            }} onClick={props.FrontContent.ExploreFunction? props.FrontContent.ExploreFunction : () => {}}> 
            Explore Now <TrendingFlatIcon sx={{marginTop: '5px', fontSize: 'small'}}/>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RotatingCard;
