import { useCallback, useState, useEffect } from 'react';
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

export const AccountProfileDetails = () => {
  const { userData } = useAuth()
  const [values, setValues] = useState({
    firstName: `${userData.firstName}`,
    lastName: `${userData.lastName}`,
    email: `${userData.email}`,
    phone: `${userData.phoneNumber}`,
    country: `${userData.countryName}`,
    state: `${userData.state}`,
    city: `${userData.city}`,
    addressLine1: `${userData.addressLine1}`,
    addressLine2: `${userData.addressLine2}`,
    addresscode: `${userData.addresscode}`,
  });
  const [selectedCurrency, setSelectedCurrency] = useState(userData.currency)
  const handleCurrencyList = (value) => {
    setSelectedCurrency(value)
}

const selectedCurrencySymbol = CurrencyMapping[selectedCurrency];
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  
  const [selectedCountry, setSelectedCountry] = useState(''); 
    const handleDataCountrySelector = (data) => {
      setSelectedCountry(data);
    };
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
      .then((data) => {
        const extractedCountries = data.map((country) => ({
          label: country.name.common,
          value: country.cca3,
        }));
        const sortedCountries = extractedCountries.slice().sort((a, b) => a.label.localeCompare(b.label))
        setCountries(sortedCountries);
      })
      .catch((error) => {
          console.error(error);
      });
    }, []);
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
      },
      []
    );
  return (
    <form
      autoComplete="off"
      noValidate
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
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <CountrySelector 
                  countries={countries} 
                  required 
                  handleDataCountrySelector = { 
                    handleDataCountrySelector 
                }/>
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
                  fullWidth
                  label="Postal code or mailbox"
                  name="addressCode"
                  onChange={handleChange}
                  required
                  value={values.addressCode}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number2"
                  name="phone2"
                  onChange={handleChange}
                  type="number"
                  value={values.phone2}
                />
              </Grid>
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
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
