import React, {useState, useEffect} from 'react'
import { 
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Unstable_Grid2 as Grid, 
    Typography,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { TextField, Button } from "@mui/material";
import FormList from '../../utilities/list';
import { useNavigate, Link } from 'react-router-dom';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';


const Page2 = ({
    formData, 
    handleSubmit, 
    handleListValues, 
    deliveryList, 
    handleNext,
    handleCheckboxChange,
    checked,
    deliveryPattern,
    deliveryPatternList,
    handleDeliveryPattern,
    updateFormData,
    handleChange
}) => {

    const [fields, setFields] = useState([{ 
        countryName: '',
        deliveryDuration: '',
        fee: '',
        addressLine1: '',
        addressLine2: '',
        addressCode: '',
        city: '',
        state: '', 
    }]);

  const addField = () => {
    setFields([...fields, { 
    countryName: '',
    deliveryDuration: '',
    fee: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
}]);
  };

  const handleFieldChange = (index, name, value) => {
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
    updateFormData(updatedFields);
  };

    return ( 
    <>
    <form onSubmit={handleSubmit}>
    <Card sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <CardHeader
          subheader="tell us a little more about your shop"
          title="Finish creating your shop"
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
        <Grid
        xs={12}
        md={6}
              >
        <FormList 
            items={deliveryPatternList} 
            listCaption= 'How do you deliver goods?' 
            handleListValue={handleDeliveryPattern}/>
        </Grid>
        {deliveryPatternList[0] === deliveryPattern || deliveryPatternList[2] === deliveryPattern? 
        <Card>
        <CardHeader
          subheader="give us details of your home delivery services"
          title="Home delivery details"
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
            <FormList 
            items={deliveryList} 
            listCaption= 'How far can you take home deliveries?' 
            handleListValue={handleListValues}/>
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
        :
        ''}
        {deliveryPatternList[1] === deliveryPattern || deliveryPatternList[2] === deliveryPattern?<>
        {fields.map((field, index) => (
            <Card>
            <CardHeader
          subheader="Give us details of your shop's delivery services"
          title={`location ${index + 1}`}
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
        
          <Grid container spacing={3} key={index}>
              <Grid item xs={12}
                md={6}>
              <TextField
                label="Country Name"
                name="countryName"
                value={field.countryName}
                onChange={(e) => handleFieldChange(index, 'countryName', e.target.value)}
                required
                fullWidth
              />
            </Grid>
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
            <Grid item xs={12}
                md={6}>
              <TextField
                label="Address Line 1"
                name="addressLine1"
                value={field.addressLine1}
                onChange={(e) => handleFieldChange(index, 'addressLine1', e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}
                md={6}>
              <TextField
                label="Address Line 2"
                name="addressLine2"
                value={field.addressLine2}
                onChange={(e) => handleFieldChange(index, 'addressLine2', e.target.value)}
                fullWidth
              />
              </Grid>
            <Grid item xs={12}
                md={6}>
              <TextField
                label="Address code or postal code"
                name="addressCode"
                value={field.addressCode}
                type='Number'
                onChange={(e) => handleFieldChange(index, 'addressCode', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}
                md={6}>
              <TextField
                label="City"
                name="city"
                value={field.city}
                onChange={(e) => handleFieldChange(index, 'city', e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}
                md={6}>
              <TextField
                label="State"
                name="state"
                value={field.state}
                onChange={(e) => handleFieldChange(index, 'state', e.target.value)}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          </Box>
        </CardContent>
          </Card>
        ))}
        <CardActions sx={{ 
            display: 'flex', 
            background: '#fff', 
            height: 'auto',
            alignSelf: 'center',
            borderRadius: '5px',
            marginTop: '5px'
        }}>
        <Button type="button" variant="contained" color="primary" sx={{width: '80px'}} onClick={addField}>
            Add
        </Button>
        </CardActions>
        </> 
        : '' }

            </Box>
            </CardContent>
            </Card>
            <Divider />
            <CardActions sx={{ justifyContent: {xs: 'start', md: 'space-between'}, flexDirection: { xs: 'column', md: 'row' } }}>
            <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
            label={ <span>
                I agree to the{' '}
                <Link to="/shop-privacy-policy" target="_blank" rel="noopener">
                Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/shop-terms-of-service" target="_blank" rel="noopener">
                Terms of Service
                </Link>
            </span>}
            />
            <div style={{display: 'flex', flexWrap: 'nowrap', gap: '3px'}}>
            <AssignmentLateOutlinedIcon />
            <Typography variant='body1'>Ensure you are careful in choosing delivery speed or duration <span><Link to="/shop-terms-of-service" target="_blank" rel="noopener">Read more</Link></span></Typography>
            </div>
            </CardActions>
            <CardActions sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
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
            onClick={handleNext}
            >
                previous
            </Button>
            <Button type="submit" variant="Button" sx={{
                width: '100px',
                background: '#007bff',
            }}>
                submit
            </Button>
            </CardActions>
            <Divider />
            </form>
    
            
    </> 
    );
}
 
export default Page2;