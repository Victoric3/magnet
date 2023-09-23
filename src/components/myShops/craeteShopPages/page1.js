import React from 'react';
import { 
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
   Unstable_Grid2 as Grid 
} from '@mui/material';
import { TextField, Button } from "@mui/material";
import FormList from "../../utilities/list";

const Page1 = ({ 
    handleChange, 
    handleNext, 
    shopTypeList, 
    handleListValue, 
    handleCategoryListValue,  
    categoryList,
    formData,
    selectedBannerFile,
    handleBannerFileChange,
    handleImgFileChange,
    selectedImgFile

}) => {
    return(<>
        <form onSubmit={handleNext} style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <Card>
          <CardHeader
          subheader="tell us about your shop"
          title="Create a shop"
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
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
              >

            <FormList 
            items={shopTypeList} 
            listCaption= 'what type of shop is this?' 
            handleListValue={handleListValue}/>
            </Grid>
            <Grid
                xs={12}
                md={6}
              >

            <FormList 
            items={categoryList} 
            listCaption= 'select a category for your shop' 
            handleListValue={handleCategoryListValue}/>
            </Grid>
            <Grid
                xs={12}
                md={6}
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
            <CardActions sx={{ 
                width: '100px', 
                alignSelf: 'end',
                borderRadius: '5px',
                height: 'auto',
                background: '#007bff', 
                color:"#fff"
                }}>
            <Button type="submit" variant="Button" 
            sx={{
              width: '100px',
              background: '#007bff', 
              color:"#fff"
              }}>
                Next
            </Button>
            </CardActions>
            </form>
        
    </>)
}

export default Page1;