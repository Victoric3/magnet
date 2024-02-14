import React, { useState } from 'react';
import logo from '../img/alpha3 logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './utilities/AuthContext';
import ConfirmationModal from './utilities/confirmationModal';
import {
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  useMediaQuery,
  Button,
  MenuItem,
  Menu
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RenderSidebar from './renderSidebar';

function Header() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { logout, userData } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [ShopExpanded, setShopExpanded] = React.useState(false);
  const [PromoteExpanded, setPromoteExpanded] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/')
    setShowLogoutModal(false); 
  };
  const handleAccordionChange = (El, setEl) => {
    setEl(!El);
  };
  const [ShopEL, setShopEL] = useState(null);
  const [PromoteEl, setPromoteEl] = useState(null);
  
  const handleMenuClick = (event, setEL) => {
    setEL(event.currentTarget);
  };

  const handleMenuClose = (setEl) => {
    setEl(null)};
    const [hovered, setHovered] = useState(false);
    
      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
    
      const buttonStyle = {
        backgroundColor: hovered ? '#ff7a47' : '#ffffff',
        color: hovered ? '#ffffff':'#333333',
      };
  
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          [isMobile ? 'width' : 'ml']: { sm: '100%', md: '100' },
          transition: 'width 0.3s',
          backgroundColor: theme => theme.palette.background.default,
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          width: '100%',
          margin: '0px auto',
          textAlign: 'center',
          padding: '15px 5px',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme => theme.palette.secondary.main,
           }}>
        <div style={{
          width: '85%', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          '@media (max-width: 600px)': {
            width: '100%', 
            margin: 0
          },
          }}>
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '5px'
            }}>
            <img src={logo} alt='logo' style={{ width: '45px', height: 'auto', borderRadius: '50%', margin: 0}}/>
            <h1 style={{fontSize: '20px'}}>AlphaMagnet3</h1>
          </div>
            
          {isMobile ? (
              <IconButton edge="start" sx={{ color: theme => theme.palette.text.secondary }} onClick={handleSidebarToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
              <div sx={{display: 'flex', alignItems: 'center',}}>
              <Button sx={{ color: theme => theme.palette.text.secondary }} onClick={() => {navigate('/')}}>Home</Button>
              <Button sx={{ color: theme => theme.palette.text.secondary }}>about</Button>
              
              <Button onClick={(e) => handleMenuClick(e, setShopEL)}>
               Shop <KeyboardArrowDownOutlinedIcon />
              </Button>
              <Menu
                anchorEl={ShopEL}
                open={Boolean(ShopEL)}
                onClose={()=> handleMenuClose(setShopEL)}
              >
              <MenuItem onClick={() => {navigate('/shop/Eshop')}}>
               <ShoppingBagOutlinedIcon sx={{ marginRight: '5px'}}/>
                E shop
              </MenuItem>
              <MenuItem onClick={() => {navigate('/shop/Pshop')}}>
              <ShoppingCartCheckoutOutlinedIcon sx={{ marginRight: '5px'}}/>
                P shop
                </MenuItem>
              <MenuItem onClick={() => {navigate('/shop/create')}}>
              <AddBusinessOutlinedIcon sx={{ marginRight: '5px'}}/>
                Create
                </MenuItem>
              <MenuItem onClick={() => {navigate('/shop/invest')}}>
              <AttachMoneyOutlinedIcon sx={{ marginRight: '5px'}}/>
                Invest
                </MenuItem>
            </Menu>
              <Button onClick={(e) => handleMenuClick(e,setPromoteEl)} sx={{color: 'text.primary'}}>
               Promote <KeyboardArrowDownOutlinedIcon />
              </Button>
              <Menu
                anchorEl={PromoteEl}
                open={Boolean(PromoteEl)}
                onClose={() => handleMenuClose(setPromoteEl)}
              >
              <MenuItem onClick={() => {navigate('/promote/affiliate')}}>
               <DatasetLinkedOutlinedIcon  sx={{ marginRight: '5px'}}/>
               Affiliate
              </MenuItem>
              <MenuItem onClick={() => {navigate('/promote/influencer')}}>
              <Groups2OutlinedIcon  sx={{ marginRight: '5px'}}/>
              Influencer
                </MenuItem>
              <MenuItem onClick={() => {navigate('/promote/sponsor')}}>
              <PaidOutlinedIcon  sx={{ marginRight: '5px'}}/>
              Sponsor
                </MenuItem>
              <MenuItem onClick={() => {navigate('/promote/collaborate')}}>
              <GroupOutlinedIcon  sx={{ marginRight: '5px'}}/>
              Collaborate
                </MenuItem>
            </Menu>
           <Button sx={{ color: theme => theme.palette.text.secondary }}>Contact</Button>
              {userData ?<><Button
              onClick={() => navigate('/DashBoard')}
              ><PersonOutlineIcon sx={{ 
                border: '1px solid black',
                borderRadius: '50%',
                width: '40px',
                height: 'auto',
                padding: '5px',
                color: '#333'
            
              }}/></Button></> 
              :
              <Button 
              sx={{ color: theme => theme.palette.text.secondary }}
              onClick={() => {navigate('/signIn')}}
              >Login</Button>}
              
              {userData? 
              <>
              <Button 
              style={buttonStyle}
              onMouseOver={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              onClick={openLogoutModal}

              sx={{ 
                color: theme => theme.palette.text.secondary, 
                border: '1px solid black',
                borderRadius: '10px',
                padding: '2px 8px'
                 }}>log out</Button>
                 <ConfirmationModal
            open={showLogoutModal}
            onClose={closeLogoutModal}
            onConfirm={handleConfirmLogout}
            message="Are you sure you want to log out?"
            /> 
            </>: 
              <Button 
              style={buttonStyle}
              onMouseOver={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              onClick={() => {navigate('/signUp')}}
              sx={{ 
                color: theme => theme.palette.text.secondary, 
                border: '1px solid black',
                borderRadius: '10px',
                padding: '2px 8px',
                background: '#ff7a47'
                 }}>Sign up</Button>
                 
              }
            </div>
            )}
            </div>
        </Toolbar>
      </AppBar>
      {isMobile ? <RenderSidebar 
      showLogoutModal={showLogoutModal}
      closeLogoutModal={closeLogoutModal}
      openLogoutModal={openLogoutModal}
      handleConfirmLogout={handleConfirmLogout}
      navigate={navigate}
      userData={userData}
      PromoteExpanded={PromoteExpanded}
      setPromoteExpanded={setPromoteExpanded}
      isMobile={isMobile}
      ShopExpanded={ShopExpanded}
      setShopExpanded={setShopExpanded}
      handleAccordionChange={handleAccordionChange}
      handleSidebarToggle={handleSidebarToggle}
      sidebarOpen={sidebarOpen}
      /> : null}
      <main sx={{ flexGrow: 1, p: 3 }}>
      </main>
    </div>
  );
}

export default Header;
