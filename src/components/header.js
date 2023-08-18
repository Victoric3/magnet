import React, { useState } from 'react';
import logo from '../img/magnet-logo-org.png';
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


function Home() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [ShopExpanded, setShopExpanded] = React.useState(false);
  const [PromoteExpanded, setPromoteExpanded] = React.useState(false);

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
          <ListItemText primary="Home" />
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
                  <ListItemText primary="E shop" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <ShoppingCartCheckoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="P shop" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <AddBusinessOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <AttachMoneyOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invest" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
      <Accordion expanded={PromoteExpanded} 
      onChange={() => handleAccordionChange(PromoteExpanded, setPromoteExpanded)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
            <RocketLaunchOutlinedIcon />
            <ListItemText primary="Promote" sx={{ paddingLeft : 3.5 }}/>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button>
                  <ListItemIcon>
                  <DatasetLinkedOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Affiliate" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <Groups2OutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Influencer" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <PaidOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sponsor" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                  <GroupOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Collaborate" />
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
        <ListItem button>
          <ListItemIcon>
            <LoginOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button sx={{border: '1px solid black'}}>
          <ListItemIcon>
            <PersonAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign up" />
        </ListItem>
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
          padding: 3,
          '@media (max-width: 600px)': {
            width: '100%', 
            margin: 0
          },
           }}>
            <div>
            <img src={logo} alt='logo' style={{ width: '100px', height: 'auto'}}/>            </div>
        <div>
            
          {isMobile ? (
              <IconButton edge="start" sx={{ color: theme => theme.palette.text.primary }} onClick={handleSidebarToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
              <div sx={{display: 'flex', alignItems: 'center'}}>
              <Button sx={{ color: theme => theme.palette.text.primary }}>Home</Button>
              <Button sx={{ color: theme => theme.palette.text.primary }}>about</Button>
              
              <Button onClick={(e) => handleMenuClick(e, setShopEL)}>
               Shop <KeyboardArrowDownOutlinedIcon />
              </Button>
              <Menu
                anchorEl={ShopEL}
                open={Boolean(ShopEL)}
                onClose={()=> handleMenuClose(setShopEL)}
              >
              <MenuItem onClick={()=> handleMenuClose(setShopEL)}>
               <ShoppingBagOutlinedIcon sx={{ marginRight: '5px'}}/>
                E shop
              </MenuItem>
              <MenuItem onClick={()=> handleMenuClose(setShopEL)}>
              <ShoppingCartCheckoutOutlinedIcon sx={{ marginRight: '5px'}}/>
                P shop
                </MenuItem>
              <MenuItem onClick={()=> handleMenuClose(setShopEL)}>
              <AddBusinessOutlinedIcon sx={{ marginRight: '5px'}}/>
                Create
                </MenuItem>
              <MenuItem onClick={()=> handleMenuClose(setShopEL)}>
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
              <MenuItem onClick={() => handleMenuClose(setPromoteEl)}>
               <DatasetLinkedOutlinedIcon  sx={{ marginRight: '5px'}}/>
               Affiliate
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose(setPromoteEl)}>
              <Groups2OutlinedIcon  sx={{ marginRight: '5px'}}/>
              Influencer
                </MenuItem>
              <MenuItem onClick={() => handleMenuClose(setPromoteEl)}>
              <PaidOutlinedIcon  sx={{ marginRight: '5px'}}/>
              Sponsor
                </MenuItem>
              <MenuItem onClick={() => handleMenuClose(setPromoteEl)}>
              <GroupOutlinedIcon  sx={{ marginRight: '5px'}}/>
              Collaborate
                </MenuItem>
            </Menu>
              
              
              <Button sx={{ color: theme => theme.palette.text.primary }}>Contact</Button>
              <Button sx={{ color: theme => theme.palette.text.primary }}>Login</Button>
              <Button 
              style={buttonStyle}
              onMouseOver={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              sx={{ 
                color: theme => theme.palette.text.primary, 
                border: '1px solid black',
                borderRadius: '10px',
                padding: '2px 8px'
                 }}>Sign up</Button>
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

export default Home;
