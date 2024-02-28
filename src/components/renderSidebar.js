import React from 'react';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandMore } from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ConfirmationModal from './utilities/confirmationModal';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';





const RenderSidebar = ({
  showLogoutModal,
  closeLogoutModal,
  openLogoutModal,
  handleConfirmLogout,
  navigate,
  userData,
  PromoteExpanded,
  setPromoteExpanded,
  isMobile,
  ShopExpanded,
  setShopExpanded,
  handleAccordionChange,
  handleSidebarToggle,
  sidebarOpen
}) => {

    return(
      <>
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
      <List sx={{color: theme=> theme.palette.text.secondary}}>
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
      <Accordion 
      sx={{color: theme=> theme.palette.text.secondary}}
      expanded={ShopExpanded} 
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
      <Accordion 
      sx={{color: theme=> theme.palette.text.secondary}}
      expanded={PromoteExpanded} 
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
        
        {userData ? <ListItem button>
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
        {userData? 
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
      </>
    )
    };

export default RenderSidebar