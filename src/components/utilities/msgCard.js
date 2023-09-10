import {React} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './msgCard.css'
import { useAuth } from './AuthContext';


const MsgCard = () => {  
  const { handleOkClick, showmsg, success, error } = useAuth()
 
  const StatusIcon = ({success}) => {
     if(success){
      return <CheckCircleOutlineIcon color="green" />
    }else{ 
      return <ErrorOutlineIcon color="red" />
    }
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
        <Typography variant="h3" sx = {{ color: success ? 'green' : 'red', padding: '25px'}}>
          { success || error } <StatusIcon success={success}/>
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