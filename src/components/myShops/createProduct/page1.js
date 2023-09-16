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
//Add a product to {currentShopData?.name}
const Page1 = ({ 
    currentShopData, 
    formData,
    returnPolicyList,
    handleListValue,
    handleImgFileChange,
    image1,
    image2,
    image3,
    image4,
    handleTypeListValue,
    handleChange,
    handleNext
}) => {
    return ( 
    <>
    <form style={{display: 'flex', flexDirection: 'column', gap: '5px'}} onSubmit={(e) => handleNext(e)}>
    <Card>
    <CardHeader
          subheader='give us details about this product'
          title={`Add a product to ${currentShopData?.name}`}
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
        <Grid
         container
         spacing={3}
        >
        <Grid
        xs={12}
        md={6}>
            <TextField
                label="Product name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
            />
        </Grid>
        <Grid
        xs={12}
        md={6}>
            <TextField
                label="Price in your currency"
                name="price"
                type="Number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
            />
        </Grid>
        <Grid
        xs={12}
        md={6}>
            <TextField
                label="Quantity"
                name="quantity"
                type="Number"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                required
            />
        </Grid>
        <Grid
        xs={12}
        md={6}>
            <TextField
                label="Discount percentage"
                name="discount"
                type="Number"
                value={formData.discount}
                onChange={handleChange}
                fullWidth
            />
        </Grid>
        <Grid
        xs={12}
        md={6}>
            <FormList items={returnPolicyList} listCaption={'Return policy*'} handleListValue={handleListValue}/>
        </Grid>
        <Grid
        xs={12}
        md={6}>
            <FormList items={['digital product', 'physical product']} listCaption={'Product type*'} handleListValue={handleTypeListValue}/>
        </Grid>
        <Grid
        xs={12}
        md={6}>
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff',
          width: '100%', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',
          }} type='button'>
        <label htmlFor="image1" className="m-0 w-100">
            <input
              accept={'image/*'}
              style={{ display: 'none' }}
              id="image1"
              name="image1"
              type="file"
              onChange={handleImgFileChange}
            />
             {!image1 ? 'insert the product image-1' : `${image1.name} selected`}
          </label>
        </button>
        </Grid>
        <Grid
        xs={12}
        md={6}>
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff',
          width: '100%', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }} type='button'>
        <label htmlFor="image2" className="m-0 w-100">
            <input
              accept={'image/*'}
              style={{ display: 'none' }}
              id="image2"
              name="image2"
              type="file"
              onChange={handleImgFileChange}
            />
             {!image2 ? 'insert the product image-2' : `${image2.name} selected`}
          </label>
        </button>
        </Grid>
        <Grid
        xs={12}
        md={6}>
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff',
          width: '100%', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }} type='button'>
        <label htmlFor="image3" className="m-0 w-100">
            <input
              accept={'image/*'}
              style={{ display: 'none' }}
              id="image3"
              name="image3"
              type="file"
              onChange={handleImgFileChange}
            />
             {!image3 ? 'insert the product image-3' : `${image3.name} selected`}
          </label>
        </button>
        </Grid>
        <Grid
        xs={12}
        md={6}>
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff',
          width: '100%', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }} type='button'>
        <label htmlFor="image4" className="m-0 w-100">
            <input
              accept={'image/*'}
              style={{ display: 'none' }}
              id="image4"
              name="image4"
              type="file"
              onChange={handleImgFileChange}
            />
             {!image4 ? 'insert the product image-4' : `${image4.name} selected`}
          </label>
        </button>
        </Grid>
        <Grid
        xs={12}
        md={6}>
            <TextField
                label="Affiliate commision"
                name="commision"
                type="Number"
                value={formData.commision}
                onChange={handleChange}
                fullWidth
            />
        </Grid>
        <Grid
        xs={12}
        md={6}>
        <TextField
            label='your product description'
            name="productOverview"
            type="text"
            value={formData.productOverview}
            onChange={handleChange}
            fullWidth
            required
        />
        </Grid>
        </Grid>
        </Box>
        </CardContent>
        <CardActions sx={{ 
                display: 'flex', 
                justifyContent:  'end', 
                width: '100%', 
                height: 'auto',
                }}>
                  <Button type="submit" variant="Button" sx={{
                width: '100px',
                background: '#007bff',
            }}
            >
                Next
            </Button>
                </CardActions>
    </Card>
    </form>
    </> );
}
 
export default Page1;