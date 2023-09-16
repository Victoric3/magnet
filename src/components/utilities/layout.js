import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  CssBaseline,
  Drawer,
  IconButton,
  useMediaQuery,
  Container,
  useTheme,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {SideNav} from '../dashBoardNav';
import { TopNav } from './topnav';

const DRAWER_WIDTH = 240;

const LayoutRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column', 
});

const LayoutContent = styled('div')(({ theme, sx }) => ({
  flexGrow: 1,
  padding: sx?.padding || theme.spacing(3),
  marginLeft: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('lg')]: {
    marginLeft: DRAWER_WIDTH, 
  },
}));

const Layout = ({ children, sx }) => {
  const [openNav, setOpenNav] = useState(false);
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, []);

  return (
    <div>
      <CssBaseline />
      <TopNav onNavOpen={() => setOpenNav(true)} />
        <SideNav open={openNav} onClose={() => setOpenNav(false)}/>
      <LayoutRoot>
        <LayoutContent sx={sx}>
          {children} 
        </LayoutContent>
      </LayoutRoot>
    </div>
  );
};

export default Layout;
