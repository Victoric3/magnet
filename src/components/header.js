import React, { useState } from 'react';
import logo from '../img/magnet-logo-org.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './utilities/AuthContext';
import ConfirmationModal from './utilities/confirmationModal';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useMediaQuery,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Menu
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';


function Header() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { isLoggedIn, logout, userData } = useAuth();

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
    // Perform logout action here
    logout();
    navigate('/')
    setShowLogoutModal(false); // Close the modal after logout
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
        backgroundColor: hovered ? '#007bff' : '#ffffff',
        color: hovered ? '#ffffff':'#333333',
      };
  
  const renderSidebar = (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="right"
      open={sidebarOpen}
      onClose={handleSidebarToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: 300, 
        flexShrink: 0,
      }}
    >
      <div/>
      <List>
        <ListItem button onClick={handleSidebarToggle}>
        <ListItemIcon>
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" onClick={() => {navigate('/')}}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      <Accordion expanded={ShopExpanded} 
      onChange={() => handleAccordionChange(ShopExpanded, setShopExpanded)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
            <ShoppingCartOutlinedIcon />
            <ListItemText primary="Shop" sx={{ paddingLeft : 3.5 }}/>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button>
                  <ListItemIcon>
                  <ShoppingBagOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="E shop" onClick={() => {navigate('/shop/Eshop')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <ShoppingCartCheckoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="P shop" onClick={() => {navigate('/shop/Pshop')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <AddBusinessOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create" onClick={() => {navigate('/shop/create')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <AttachMoneyOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invest" onClick={() => {navigate('/shop/invest')}}/>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
      <Accordion expanded={PromoteExpanded} 
      onChange={() => handleAccordionChange(PromoteExpanded, setPromoteExpanded)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
            <RocketLaunchOutlinedIcon />
            <ListItemText primary="Promote" sx={{ paddingLeft : 3.5 }} />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button>
                  <ListItemIcon>
                  <DatasetLinkedOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Affiliate" onClick={() => {navigate('/promote/affiliate')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <Groups2OutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Influencer" onClick={() => {navigate('/promote/influencer')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <PaidOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sponsor" onClick={() => {navigate('/promote/sponsor')}}/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <GroupOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Collaborate" onClick={() => {navigate('/promote/collaborate')}}/>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        <ListItem button>
          <ListItemIcon>
            <BuildOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LocalPhoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem> 
        
        {isLoggedIn ? <ListItem button>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="DashBoard"
          onClick={() => {navigate('/dashBoard')}}/>
        </ListItem>
        :
        <ListItem button>
          <ListItemIcon>
            <LoginOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Login"
          onClick={() => {navigate('/signIn')}}/>
        </ListItem>}
        {isLoggedIn? 
          <>
          <ListItem button sx={{border: '1px solid black'}}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
          primary="log out" 
          onClick={openLogoutModal}/>
          </ListItem>
          <ConfirmationModal
          open={showLogoutModal}
          onClose={closeLogoutModal}
          onConfirm={handleConfirmLogout}
          message="Are you sure you want to log out?" /> 
          </>
        : <ListItem button sx={{border: '1px solid black'}}>
          <ListItemIcon>
            <PersonAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText 
          primary="Sign up" 
          onClick={() => {navigate('/signUp')}}/>
        </ListItem>
        }
        
      </List>
    </Drawer>
  );
  
  
    
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
          justifyContent: 'space-between',
          width: '85%',
          margin: '0px auto',
          textAlign: 'center',
          padding: '15px 5px',
          '@media (max-width: 600px)': {
            width: '100%', 
            margin: 0
          },
           }}>
            <div>
            <img src={logo} alt='logo' style={{ width: '75px', height: 'auto'}}/></div>
        <div>
            
          {isMobile ? (
              <IconButton edge="start" sx={{ color: theme => theme.palette.text.primary }} onClick={handleSidebarToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
              <div sx={{display: 'flex', alignItems: 'center',}}>
              <Button sx={{ color: theme => theme.palette.text.primary }} onClick={() => {navigate('/')}}>Home</Button>
              <Button sx={{ color: theme => theme.palette.text.primary }}>about</Button>
              
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
           <Button sx={{ color: theme => theme.palette.text.primary }}>Contact</Button>
              {isLoggedIn ?<><Button
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
              sx={{ color: theme => theme.palette.text.primary }}
              onClick={() => {navigate('/signIn')}}
              >Login</Button>}
              
              {isLoggedIn? 
              <>
              <Button 
              style={buttonStyle}
              onMouseOver={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              onClick={openLogoutModal}

              sx={{ 
                color: theme => theme.palette.text.primary, 
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
                color: theme => theme.palette.text.primary, 
                border: '1px solid black',
                borderRadius: '10px',
                padding: '2px 8px'
                 }}>Sign up</Button>
                 
              }
            </div>
            )}
            </div>
        </Toolbar>
      </AppBar>
      {isMobile ? renderSidebar : null}
      <main sx={{ flexGrow: 1, p: 3 }}>
      </main>
    </div>
  );
}

export default Header;
