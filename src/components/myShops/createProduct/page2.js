import React, {useState, useEffect} from 'react'
import { 
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Unstable_Grid2 as Grid, 
    Typography
} from '@mui/material';
import { TextField, Button } from "@mui/material";

const Page2 = ({ updateFormData, handleNext, handlePrevious, formData }) => {

    const [fields, setFields] = useState(
      formData.productSpecifications.map(field => ({
        caption: field.caption,
        description: field.description
    })));

  const addField = () => {
    setFields([...fields, { 
        caption: '',
        description: '' 
}]);    
  };

  const handleFieldChange = (index, name, value) => {
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
    updateFormData(updatedFields);
  };
    return ( <>
    <form onSubmit={(e) => {handleNext(e)}}>
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
        
        {fields.map((field, index) => (
            <Card>
            <CardHeader
          subheader="Give potential customers details of this product"
          title={`Product specification ${index + 1}`}
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
        
          <Grid container spacing={3} key={index}>
              <Grid item xs={12}
                md={6}>
              <TextField
                label="what is the caption of this specification"
                name="caption"
                value={field.caption}
                onChange={(e) => handleFieldChange(index, 'caption', e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}
                md={6}>
              <TextField
                label="write the specification here"
                name="description"
                value={field.description}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
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
            background: '#007bff', 
            width: '180px', 
            height: '40px',
            alignSelf: 'center',
            borderRadius: '5px',
            marginTop: '5px'
        }}>
        <Button type="button" variant="Button" sx={{width: '100%'}} onClick={addField}>
            Add specification
        </Button>
        </CardActions>
        
        </Grid>
        </Box>
        </CardContent>
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
                Next
            </Button>
            </CardActions>
        </Card>
        </form>
    
    
    </> );
}
 
export default Page2;