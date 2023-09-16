import React, {useState} from 'react'
import { 
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Unstable_Grid2 as Grid, 
    Typography,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { TextField, Button } from "@mui/material";
import { useAuth } from '../../utilities/AuthContext';
import { Link } from 'react-router-dom';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';



const Page3 = (
    {formData, 
    updatedeliveryFormData, 
    checked,
    handleCheckboxChange,
    handleChange,
    handleSubmit,
    handlePrevious
  }
    ) => {
    const { currentShopData } = useAuth()
    const [fields, setFields] = useState(
      currentShopData.deliveryLocations.map(deliveryLocations => ({
          countryName: deliveryLocations.countryName,
          deliveryDuration: deliveryLocations.deliveryDuration,
          fee: deliveryLocations.fee,
          addressLine1: deliveryLocations.addressLine1,
          addressLine2: deliveryLocations.addressLine2,
          city: deliveryLocations.city,
          state: deliveryLocations.state
        }))
      );
  const handleFieldChange = (index, name, value) => {
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
    updatedeliveryFormData(updatedFields);
  };
    return ( <>
        <form onSubmit={(e) => {handleSubmit(e)}}>
    <Card sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <CardHeader
          subheader="you can edit the details of your home delivery for this product or ignore"
          title="Finish creating your product"
        />
        <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
                <Grid
                xs={12}
                md={6}
                      >
        {currentShopData.homeDeliveryDistance? <>
            <Card>
        <CardHeader
          subheader="give us details of your home delivery services"
          title={<Typography variant='h6'>
                    Home delivery details
                  </Typography> }
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
            label="Delivery fee per kilometer"
            name="homeDeliveryFee"
            value={formData.homeDeliveryFee}
            onChange={handleChange}
            type='Number'
            required
            fullWidth
            />
        </Grid>
        <Grid
        xs={12}
        md={6}
              >
            <TextField
            label="Delivery speed in hours per kilometer"
            name="homeDeliverySpeed"
            value={formData.homeDeliverySpeed}
            onChange={handleChange}
            type='Number'
            required
            fullWidth
            />
        </Grid>
        </Grid>
        </Box>
        </CardContent>

        </Card>
        
        </> : ''}
        {fields.map((field, index) => (
            <Card>
            <CardHeader
          subheader={`You can Edit this location -(${field.state}, ${field.city} ${field.addressLine1}) or ignore`}
          title={<Typography variant='h6'>
                    {`Location ${index + 1} (${field.countryName})`}
                  </Typography>
                }
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
        
          <Grid container spacing={3} key={index}>
              <Grid item xs={12}
                md={6}>
              <TextField
                label="Delivery Duration in hours"
                name="deliveryDuration"
                value={field.deliveryDuration}
                onChange={(e) => handleFieldChange(index, 'deliveryDuration', e.target.value)}
                required
                type='Number'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}
                md={6}>
              <TextField
                label="Fee"
                name="fee"
                value={field.fee}
                onChange={(e) => handleFieldChange(index, 'fee', e.target.value)}
                required
                type='Number'
                fullWidth
              />
            </Grid>

          </Grid>
          </Box>
        </CardContent>
        
          </Card>))}
            
            
        </Grid>
          </Box>
        </CardContent>
          </Card>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
            label={ <span>
                I agree to the{' '}
                <Link to="/product-privacy-policy" target="_blank" rel="noopener">
                Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/product-terms-of-service" target="_blank" rel="noopener">
                Terms of Service
                </Link>
            </span>}
            />
            <div style={{display: 'flex', flexWrap: 'nowrap', gap: '3px'}}>
            <AssignmentLateOutlinedIcon />
            <Typography variant='body1'>Ensure you are careful in choosing delivery speed or duration <span><Link to="/product-terms-of-service" target="_blank" rel="noopener">Read more</Link></span></Typography>
            </div>
            </CardActions>
            <CardActions sx={{ 
                display: 'flex', 
                justifyContent: "space-between", 
                width: '100%', 
                height: 'auto',
                }}>
           <Button 
            type="button" 
            variant="Button" 
            sx={{
                width: '100px',
                background: '#007bff',
            }} 
            onClick={(e) => handlePrevious(e)}
            >
                previous
            </Button>
            <Button type="submit" variant="Button" sx={{
                width: '100px',
                background: '#007bff',
            }}
            
            >
              Submit
            </Button>
            </CardActions>
          </form>
    
    </> );
}
 
export default Page3;