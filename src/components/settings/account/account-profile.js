import React, { useState, useRef } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuth } from '../../utilities/AuthContext';

export const AccountProfile = ({ selectedFile, selectedFileUrl, handleFileChange}) => {
  const { userData } = useAuth()
  

  const handleUploadClick = () => {
    // Trigger the file input when the "Upload picture" button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = React.createRef();

  return( <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedFile || userData.imageUrl ?
        <img
          src={selectedFileUrl || userData.imageUrl}
          alt="User Avatar"
          style={{
            height: '80px',
            width: '80px',
            marginBottom: '2px',
            borderRadius: '50%'
          }}
        /> : <Avatar
            src={userData.imageUrl}
        />}
        <Typography
          gutterBottom
          variant="h5"
        >
          {`${userData.firstName} ${userData.lastName}`}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
         {userData.countryName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {userData.role}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
        onClick={handleUploadClick}
      >
        {!selectedFile ? 'Upload picture' : 'Change picture'}
      </Button>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </CardActions>
  </Card>
  )
};
