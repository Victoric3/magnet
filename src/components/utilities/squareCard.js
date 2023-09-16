import React from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';



const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  height: '300px',
  padding: '5px',
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
      <IconWrapper className="iconButton">
        {React.createElement(props.icon, {style: {fontSize: '38px'}})}
      </IconWrapper>
      <CardContent>
        <Typography variant='h5'  sx={{ textAlign: 'center' }}>
          {props.title}
        </Typography>
        <Typography variant='h6' sx={{ 
          textAlign: 'center', 
          marginTop: '10px',
          }}>
          {props.content}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default SquareCard;
