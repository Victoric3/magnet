import React from 'react';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import { Box, ButtonBase, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, onClick, title } = props;
  const theme = useTheme();

  return (
    <li>
      <ButtonBase
        onClick={onClick}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'center', 
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          backgroundColor: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent', 
          color: active ? 'white' : 'white', 
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)', 
            color: 'white'
          }
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'white', 
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: '#007bff' 
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: active ? 600 : 400,
          }}
        >
          {title}
        </Typography>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired
};
