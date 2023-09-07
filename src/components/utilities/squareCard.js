import React from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';



const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  height: '2o0px',
  padding: '20px',
  borderRadius: theme.spacing(1),
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s',
  '&:hover': {
    marginTop: '-10px',
    '& .iconButton': {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.secondary.main, 
    },
  },
}));

const IconWrapper = styled(IconButton)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '1px dashed black',
  backgroundColor: 'transparent',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  color: theme.palette.secondary.main,
  transition: 'color 0.3s',
}));

const SquareCard = (props) => {
  return (
    <StyledCard>
      <IconWrapper className="iconButton" sx={{ fontSize: '35px' }}>
        {React.createElement(props.icon)}
      </IconWrapper>
      <CardContent>
        <Typography variant='h3'  sx={{ textAlign: 'center', fontWeight: '500'}}>
          {props.title}
        </Typography>
        <Typography variant='h4' sx={{ 
          textAlign: 'center', 
          marginTop: '10px',
          fontWeight: '400'
          }}>
          {props.content}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default SquareCard;
