import React, { useEffect, useState } from 'react';
import { MenuItem, Menu, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const FormList = ({ items, listCaption, handleListValue}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState('');
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

   
  return (
    <div className="country-selector">
      <Typography
        variant="subtitle1"
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          border: '1px solid #333333',
          color: '#333333',
          opacity: '0.7',
          padding: '15px',
          borderRadius: '5px'
        }}
      >
        {selectedItem || listCaption}
        <ExpandMoreIcon sx={{ ml: 1 }} />
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          width: '100%', // Same width as the form
        //   transform: 'translateX(50%)',
        //   margin: '50%'
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => {
              setSelectedItem(item);
              handleListValue(item);
              handleClose();
            }}
            sx={{
              backgroundColor: '#fff',
              color: '#333',
              width: '100%',
              height: '50%'
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FormList;
