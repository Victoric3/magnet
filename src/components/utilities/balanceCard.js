import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const BalanceCard = ({ currentBalance, pendingBalance, currency }) => {
  const [showBalances, setShowBalances] = useState(false);

  const toggleBalances = () => {
    setShowBalances(!showBalances);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '20px'}}>
      <CardContent>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant="h5" sx={{ 
        // marginLeft: '58%',
        marginBottom: '25px',
        cursor: 'pointer',
        }}>
          Account Balance 
        </Typography >
      <Typography  variant='h5' color="primary" 
      sx={{ 
        marginLeft: '19%',
        marginTop: '-25px',
        cursor: 'pointer',
        '&:hover': {
          color: '#ff3811', 
        },
      }}>
          Transaction History
        </Typography>
        </div>
        {
          <div>
            {(showBalances?
            <>
            <Typography variant="h2">  {currency}{currentBalance}</Typography>
            <Typography variant="h6">Pending Balance: {currency}{pendingBalance}</Typography>
            </>
            :
            <>
            <Typography variant="h2">  ****</Typography>
            <Typography variant="h6">Pending Balance: ****</Typography>
            </>)
            }
          </div>
        }
        <IconButton onClick={toggleBalances} sx={{cursor: 'pointer'}}>
          {showBalances? <VisibilityIcon /> : <VisibilityOffIcon /> }
        </IconButton>
        
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px'
          }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flexDirection: 'column'
          }}
          >
          <AttachMoneyIcon fontSize='large' sx={{
            '&:hover': {
                color: '#ff3811', 
              },}}/>
          <Typography variant='h4'>invest</Typography>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flexDirection: 'column'
          }}
          >
          <AccountBalanceIcon fontSize='large' sx={{
            '&:hover': {
                color: '#ff3811', 
              },}}/>
          <Typography variant='h4'>withdraw</Typography>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
          }}>
          <PaymentIcon fontSize='large' sx={{
            '&:hover': {
                color: '#ff3811', 
              },}}/>
          <Typography variant='h4'>Transfer</Typography>


          </div>
          </div>
      </CardContent>
    </Card>
  );}

export default BalanceCard;
