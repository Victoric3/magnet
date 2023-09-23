import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Typography, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import './Dropdown.css'

const CountrySelector = ({ countries, handleDataCountrySelector, prefilled }) => {
 
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

 
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
        {selectedCountry || prefilled || 'Select your country'}
        <ExpandMoreIcon sx={{ ml: 1 }} />
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          width: '100%', 
        }}
      >
        {countries.map((country) => (
          <MenuItem
            key={country.value}
            onClick={() => {
              setSelectedCountry(country.label);
              handleDataCountrySelector(country.label)
              handleClose();
            }}
            sx={{
              backgroundColor: '#fff',
              color: '#333',
              width: '100%',
              opacity: '1',
              height: '50%'
            }}
          >
            {country.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
    
    
  );
};

export default CountrySelector;
