import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationModal from "../utilities/confirmationModal";
import useDeleteShop from '../hooks/useDeleteShop';
import { useNavigate } from 'react-router-dom';



export const CompanyCard = ({shop, Editing }) => {
  const navigate = useNavigate()
 const { deleteShop } = useDeleteShop()
  const isEditing = Editing
  const [showconfirmModal, setShowconfirmModal] = useState(false);
  
  const openconfirmModal = () => {
    setShowconfirmModal(true);
  };

  const closeconfirmModal = () => {
    setShowconfirmModal(false);
  };
  
  return (
    <>
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto'
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
            src={shop.shopImgUrl}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {shop.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {shop.shopCatchPhrase}
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
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ReceiptIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {shop?.orders?.length} Order(s)
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
            {shop.products.length} Product(s)
          </Typography>
        </Stack>
      </Stack>
    </Card>

    {isEditing? <div style={{
      display: 'flex',
      justifyContent: 'end',
      marginTop: '5px',
      gap: '5px'
      }}>
        <SvgIcon
            color="action"
            fontSize="medium"
          >
            <AddIcon onClick={() => {
              localStorage.setItem("currentShopData", JSON.stringify(shop))
              navigate('/createProduct')
              }} sx={{cursor: 'pointer'}}/>
        </SvgIcon>
        <SvgIcon
            color="action"
            fontSize="medium"
          >
            <EditIcon onClick={() => navigate('/editShop')} sx={{cursor: 'pointer'}}/>
        </SvgIcon>
        <SvgIcon
            color="action"
            fontSize="medium"
          >
            <DeleteIcon onClick={openconfirmModal} sx={{cursor: 'pointer'}}/>    
        </SvgIcon>
    </div> : '' }
    <ConfirmationModal 
        open={showconfirmModal}
        onClose={closeconfirmModal}
        onConfirm={() => {deleteShop(shop); setShowconfirmModal(false)}}
        message={`are you sure you want to delete ${shop?.name}`}
        />
    </>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
