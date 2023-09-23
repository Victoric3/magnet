import React, {useState, useEffect, Fragment } from 'react'
import { 
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Unstable_Grid2 as Grid, 
    IconButton, 
    Typography,
    Checkbox
} from '@mui/material';
import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../utilities/AuthContext'

const Page2 = ({ 
  updateFormData, 
  handleNext, 
  handlePrevious, 
  formData, 
  Page2EditCaption1, 
  Page2EditsubHeader1 
}) => {
  const [editing, setEditing] = useState()
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [fields, setFields] = useState([...formData.productSpecifications]);

  const addField = (title) => {
    const updatedFields = [...fields];
    updatedFields.push({ title: '', items: [{ caption: '', description: '' }] });
    setFields(updatedFields);
    updateFormData(updatedFields);
  };
  
  const addSubField = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].items.push({ caption: '', description: '' });
    setFields(updatedFields);
    updateFormData(updatedFields);
  };
  const removeSelectedFields = () => {
    const updatedFields = fields.filter((field, index) => !selectedLocations.includes(index));
    setEditing(!editing)
    setFields(updatedFields);
    setSelectedLocations([]);
    updateFormData(updatedFields);
  };
  
  const handleFieldChange = (index, subIndex, name, value) => {
    const updatedFields = [...fields];
  
    if (name === 'selected' && value) {
      setSelectedLocations([...selectedLocations, index]);
    } else if (name === 'selected' && !value) {
      setSelectedLocations(selectedLocations.filter(selectedIndex => selectedIndex !== index));
    }else if (subIndex === null || subIndex === undefined) {
      updatedFields[index].title = value;
    } else if(name === 'selected'){
      updatedFields[index].items[subIndex][name] = value;
    }
  
    setFields(updatedFields);
    updateFormData(updatedFields);
  };
  
    return ( <>
    <form onSubmit={(e) => {handleNext(e)}}>
    <Card sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <CardHeader
          subheader={Page2EditsubHeader1 || "tell us a little more about your product"}
          title={Page2EditCaption1 || "Finish adding this product"}
        />
        <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
        <Grid
        xs={12}
        md={6}
              >
        
        {fields.map((field, index) => (
  <Card key={index}>
    <CardHeader
      subheader="Give potential customers details of this product"
      title={
        <Typography variant='h6'>
          {`Product specification(${index + 1}) (${field?.title})`}
        </Typography>
      }
    />
    <CardContent sx={{ pt: 0 }}>
      <Box sx={{ m: -1.5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Specification Title"
              name="title"
              value={field?.title}
              onChange={(e) => handleFieldChange(index, null, 'title', e.target.value)}
              required
              fullWidth
            />
          </Grid>
          </Grid>
          <Grid container spacing={3}>
          {field.items.map((item, subIndex) => (
            <Fragment key={subIndex}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Specification Caption"
                  name="caption"
                  value={item.caption}
                  onChange={(e) => handleFieldChange(index, subIndex, 'caption', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Specification Description"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleFieldChange(index, subIndex, 'description', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Fragment>
          ))}
          {editing && <Grid item xs={12} md={12}>
            <Checkbox
              checked={selectedLocations.includes(index)}
              onChange={(e) => handleFieldChange(index, null, 'selected', e.target.checked)}
            />
            </Grid>}
          </Grid>
          </Box>
        </CardContent>
          <IconButton>
            <AddIcon onClick={() => addSubField(index)}/>
          </IconButton>
          </Card>
        ))}
        <CardActions sx={{ 
            display: 'flex', 
            width: '100%', 
            height: '40px',
            justifyContent: 'space-between',
            borderRadius: '5px',
            marginTop: '5px'
        }}>
        <Button type="button" variant="contained" sx={{width: '180px',background: '#007bff'}} onClick={addField}>
            Add specification
        </Button>
         <Button type="button" variant="contained" sx={{width: '80px', background: 'red'}} onClick={removeSelectedFields}>
            {!editing ? 'select' : 'Remove'}
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