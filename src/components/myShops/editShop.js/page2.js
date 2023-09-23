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

const Page2 = (
    {formData, 
    updatedeliveryFormData, 
    handleChange,
    handleUpdate,
}
) => {
    const { currentShopData } = useAuth();
    const [editing, setEditing] = useState()
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [fields, setFields] = useState(
      currentShopData.deliveryLocations.map(deliveryLocations => ({
          countryName: deliveryLocations.countryName,
          deliveryDuration: deliveryLocations.deliveryDuration,
          fee: deliveryLocations.fee,
          addressLine1: deliveryLocations.addressLine1,
          addressLine2: deliveryLocations.addressLine2,
          addressCode: parseInt(deliveryLocations.addressCode, 10),
          city: deliveryLocations.city,
          state: deliveryLocations.state
        }))
      );
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
        updatedeliveryFormData(updatedFields)

        if (name === 'selected' && value) {
          setSelectedLocations([...selectedLocations, index]);
        } else if (name === 'selected' && !value) {
          setSelectedLocations(selectedLocations.filter(selectedIndex => selectedIndex !== index));
        }
      };
      const removeSelectedFields = () => {
        const updatedFields = fields.filter((field, index) => !selectedLocations.includes(index));
        setEditing(!editing)
        setFields(updatedFields);
        setSelectedLocations([]);
        updatedeliveryFormData(updatedFields);
      };
    return ( <>
        <form onSubmit={(e) => {handleUpdate(e)}}>
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
            label="Delivery distance"
            name="homeDeliveryDistance"
            value={formData.homeDeliveryDistance}
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
                label="countryName"
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
                label="state"
                name="state"
                value={field.state}
                onChange={(e) => handleFieldChange(index, 'state', e.target.value)}
                required
                fullWidth
              />
            </Grid>
              <Grid item xs={12}
                md={6}>
              <TextField
                label="city"
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
                label="address line 1"
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
                label="address line 2"
                name="addressLine2"
                value={field.addressLine2}
                onChange={(e) => handleFieldChange(index, 'addressLine2', e.target.value)}
                required
                fullWidth
              />
            </Grid>
              <Grid item xs={12}
                md={6}>
              <TextField
                label="address code"
                name="addressCode"
                value={field.addressCode}
                onChange={(e) => handleFieldChange(index, 'addressCode', e.target.value)}
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
            {editing && <Grid item xs={12} md={12}>
            <Checkbox
              checked={selectedLocations.includes(index)}
              onChange={(e) => handleFieldChange(index, 'selected', e.target.checked)}
            />
            </Grid>}

          </Grid>
          </Box>
        </CardContent>
        
          </Card>))}
          <CardActions sx={{ 
            display: 'flex', 
            background: '#fff', 
            width: '100%', 
            height: 'auto',
            justifyContent: 'space-between',
            borderRadius: '5px',
            marginTop: '5px'
        }}>
        <Button type="button" variant="contained" color="primary" sx={{width: '80px'}} onClick={addField}>
            Add
        </Button>
        {currentShopData.deliveryLocations?
         <Button type="button" variant="contained" sx={{width: '80px', background: 'red'}} onClick={removeSelectedFields}>
            {!editing ? 'select' : 'Remove'}
        </Button> : ''}

        </CardActions>
            
            
        </Grid>
          </Box>
        </CardContent>
          </Card>
            <CardActions sx={{ 
                display: 'flex', 
                justifyContent: "end", 
                width: '100%', 
                height: 'auto',
                }}>
            <Button type="submit" variant="contained" sx={{
                background: '#007bff',
            }}
            
            >
              save details
            </Button>
            </CardActions>
          </form>
    
    </> );
}
 
export default Page2;