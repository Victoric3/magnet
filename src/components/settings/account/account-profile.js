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

export const AccountProfile = () => {
  const { userData } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };

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
        {selectedFile ?
        <img
          src={selectedFileUrl}
          alt="User Avatar"
          style={{
            height: '80px',
            width: '80px',
            marginBottom: '2px',
            borderRadius: '50%'
          }}
        /> : <Avatar
          src={userData.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
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
