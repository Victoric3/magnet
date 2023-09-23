import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import FormList from "../../utilities/list";
import { useAuth } from '../../utilities/AuthContext';
import CountrySelector from '../../utilities/countrySelector'
import { Currencies } from '../../utilities/formLists'
import CurrencyMapping from '../../utilities/formLists'
import PhoneInput from 'react-phone-input-2';

export const AccountProfileDetails = ({
  values,
  handleChange,
  countries,
  handleDataCountrySelector,
  handleCurrencyList,
  handleSubmit,
  handlePhoneNumberChange,
  selectedCountry
}) => {
  const { userData } = useAuth()
  
    

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Update your Profile"
          title="Profile"
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
                  fullWidth
                  helperText="Please specify your first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
              <PhoneInput
                name='phoneNumber'
                value={userData.phoneNumber}
                onChange={handlePhoneNumberChange}
                country={`us`} 

                inputProps={{
                  className: 'form-input', 
                  style: {
                    padding: '18px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px',
                    width: '92%',
                    marginLeft: '8%'
                  },
                }}
              /></Grid>
              <Grid
                xs={12}
                md={6}
              >
                <CountrySelector 
                  countries={countries} 
                  prefilled={userData.countryName} 
                  handleDataCountrySelector = {handleDataCountrySelector}
                  />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  onChange={handleChange}
                  required
                  value={values.state}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="city"
                  name="city"
                  onChange={handleChange}
                  required
                  value={values.city}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Address Line1"
                  name="addressLine1"
                  onChange={handleChange}
                  required
                  value={values.addressLine1}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Address Line2"
                  name="addressLine2"
                  onChange={handleChange}
                  required
                  value={values.addressLine2}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
              <TextField
                label="Postal code or mailbox"
                name="addressCode"
                value={values.addressCode}
                type="Number"
                onChange={handleChange}
                fullWidth
                required
              /></Grid>
              <Grid
                xs={12}
                md={6}
              >
                <FormList 
                  items={Currencies} 
                  listCaption= {userData.currency} 
                  handleListValue={handleCurrencyList}/>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
