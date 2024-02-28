import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import logo from '../../img/alpha3 logo.jpg';
import signInBanner from '../../img/affiliate-marketing.png';
import { useNavigate } from 'react-router-dom';



const Layout = ({ children, component }) => {
  const navigate = useNavigate()
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
      }}
    >
      <Grid container sx={{ flex: '1 1 auto' }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
          </Box>
          <div style={{
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            margin: '70px 0px -50px 0px'
            }}>
          <img src={logo} alt="alphamagnet3's logo" onClick={() => navigate('/')} style={{width: '80px', height: 'auto', borderRadius: '50%', cursor: 'pointer'}}/>
          <Typography variant='h5' sx={{color: theme=> theme.palette.text.secondary}}>Alphamagnet3</Typography>
          </div>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: theme=> `radial-gradient(50% 50% at 50% 50%, ${theme.palette.primary.main} 0%, ${theme.palette.tetiary.main} 100%)`,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            height: component==='signUp' ? 'auto' : '100vh',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Welcome to{' '}
              <Box
                component="a"
                sx={{ color: theme=> theme.palette.secondary.main }}
                target="_blank"
              >
                Alphamagnet3
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="body1"
            >
              Like a magnet, we connect buyers and sellers 
            </Typography>
            <img
              alt="layout Banner"
              src={signInBanner}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
