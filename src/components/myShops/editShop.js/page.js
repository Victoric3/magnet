import React from "react";
import { useAuth } from "../../utilities/AuthContext";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Box
  } from '@mui/material';


const ShopDetails = ({
    formData, 
    handleChange, 
    selectedBannerFile, 
    handleBannerFileChange,
    selectedImgFile,
    handleImgFileChange,
    handleUpdate
}) => {
    return ( 
    <>
        <form onSubmit={handleUpdate}>
        <Card>
            <CardHeader
            subheader="you can change the details of your shop here"
            title="Update shop"
            />
            <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: 1.5 }}>
            <Grid
              container
              spacing={3}
            >
            <Grid
                xs={12}
                md={6}
              >
        <TextField
            label="Shop name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            />
            </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
          <TextField
            label="youremail@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            />
            </Grid>

            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <TextField
            label="opens at?..."
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            required
            fullWidth
            />
            </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <TextField
                label="closes at?..."
                name="closingHours"
                value={formData.closingHours}
                onChange={handleChange}
                required
                fullWidth
                />
            </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <button style={{ 
            border: '1px solid #333333b0', 
            background: '#fff', 
            color: '#333333b0',
            textAlign: 'left',
            padding: '20px 10px',
            width: '100%'
            }} type="button">
            <label htmlFor="Img-file-input" className="m-0 w-100">
                <input
                accept={'image/*'}
                style={{ display: 'none', width: '100%' }}
                id="Img-file-input"
                type="file"
                onChange={handleImgFileChange}
                />
             {!selectedImgFile ? 'select your shop logo' : `${selectedImgFile.name} selected`}
            </label>
            </button>
              </Grid>
              <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <button style={{ 
            border: '1px solid #333333b0', 
            background: '#fff', 
            color: '#333333b0',
            textAlign: 'left',
            padding: '20px 10px',
            width: '100%'
            }} type="button">
            <label htmlFor="banner-file-input" className="m-0 w-100">
                <input
                accept={'image/*'}
                style={{ display: 'none', width: '100%' }}
                id="banner-file-input"
                type="file"
                onChange={handleBannerFileChange}
            />
            {!selectedBannerFile ? 'select your shop profile banner' : `${selectedBannerFile.name} selected`}
            </label>
            </button>
              </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <TextField
                label="paste your faceBook profile link"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                fullWidth
            />
              </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <TextField
                label="paste your instagram profile link"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                fullWidth
            />
              </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
              >
            <TextField
                label="paste your twitter profile link"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            fullWidth
            />
            </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
            >
            <TextField
                label="paste your linkedIn profile link"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
            >
            <TextField
                label="your tagline"
                name="shopCatchPhrase"
                value={formData.shopCatchPhrase}
                onChange={handleChange}
                required
                fullWidth
            />
            </Grid>
            <Grid
                xs={12}
                md={6}
                sx={{ pb: 2 }}
            >
            <TextField
                label="describe your shop"
                name="shopOverview"
                value={formData.shopOverview}
                onChange={handleChange}
                required
                fullWidth
            />
            </Grid>
            </Grid>
            </Box>
            </CardContent>
            </Card>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" type='submit'>
                    Save details
                </Button>
            </CardActions>
            </form>
    </> );
}
 
export default ShopDetails;