import {React, useEffect} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './msgCard.css'


const MsgCard = ({ errorMessage, success, handleOkClick, showmsg }) => {  
 
  const StatusIcon = ({ isSuccess }) => {
    return isSuccess ? <CheckCircleOutlineIcon color="green" /> : <ErrorOutlineIcon color="red" />;
  };

  
 
  return (
    <div className={ `error-overlay ${showmsg ? 'show' : 'hide'}`}>
    <div className="overlay"></div>
    <Card
      className="error-card"
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        marginTop: 20,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Typography variant="h3" sx = {{ color: errorMessage ? 'red' : 'green', padding: '25px'}}>
          {errorMessage || success} <StatusIcon isSuccess={success}/>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOkClick} >
            OK
          </Button>
      </CardContent>
    </Card>
    </div>
  );
};

export default MsgCard;