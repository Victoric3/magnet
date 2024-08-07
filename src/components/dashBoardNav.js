import React from 'react';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import { Box, Button, Divider, Drawer, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { items } from './utilities/config';
import { items2 } from './pshop/shopNavItems';
import { SideNavItem } from './utilities/sideNavItem';
import { useNavigate } from 'react-router-dom';
import eshop  from '../img/E-shop.jpg'
import './customScrollBar.css'

const sideNavStyles = {
  backgroundColor: '#ff3811', 
  color: 'white',
};
export const SideNav = (props) => {
  const navigate = useNavigate()
  const { open, onClose, shop } = props;
  const sideNavItems = shop? items2 : items;
  const pathname = window.location.pathname; 
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  

  const content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Alphamagnet3
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              alignItems: 'start'
            }}
          >
            {sideNavItems.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  onClick={() => {navigate(`/${item.path}`)}}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Magnet Eshop
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Eshop here.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="magnet shop"
              src={eshop}
            />
          </Box>
          <Button
            component="a"
            endIcon={(
              <SvgIcon fontSize="small">
                <ArrowTopRightOnSquareIcon />
              </SvgIcon>
            )}
            fullWidth
            href="https://material-kit-pro-react.devias.io/"
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
          >
            Visit Eshop
          </Button>
        </Box>
      </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            ...sideNavStyles, 
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          ...sideNavStyles,
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
