import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';

import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useAuth } from '../utilities/AuthContext';



export const CompanyCard = ({
  sx,
  image,
  name,
  catchPhrase,
  orders,
  number,
  items,
  ordersCaption,
  itemsCaption,
  ordersIcon

}) => {
  
  return (
    <>
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: `${sx?.width}`
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={image}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {catchPhrase}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          {ordersIcon}
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {orders} {ordersCaption}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="medium"
          >
            <TurnedInIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {items} {itemsCaption}
          </Typography>
        </Stack>
      </Stack>
    </Card>
    </>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
