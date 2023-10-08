import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from '../../utilities/AuthContext';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';


export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, pshop } = props;
  const { userData, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={`${userData.firstName}`} />
        </ListItem>
        {pshop? <><ListItem button>
          <ListItemIcon>
            <BookmarkBorderRoundedIcon />
          </ListItemIcon>
          <ListItemText primary='Orders(0)' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Wishlist(0)" />
        </ListItem></>: ''}
        <ListItem button>
          <ListItemIcon>
            {/* {navItem.icon} */}
          </ListItemIcon>
          {/* <ListItemText primary={navItem.title} /> */}
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={() => {
          logout(); 
          navigate('/')
          }}/>
        </ListItem>
      </List>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
