import { 
  TextField,
   Button, 
   Link, 
   Typography, 
   FormControlLabel, 
   Checkbox, 
   Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
   Unstable_Grid2 as Grid 
  } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CountrySelector from '../utilities/countrySelector'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import FormList from "../utilities/list";
import { useAuth } from '../utilities/AuthContext'
import CurrencyMapping from '../utilities/formLists'
import { Currencies } from '../utilities/formLists'
import './signUpForm.css'

const SignupForm = () => {
const { messageShower, handleMsgCollector, baseUrl } = useAuth()
//data sent to backend
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    addressCode: '',
    
  });
  const navigate = useNavigate()


  //function to get formData from form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  //save error state and move up the tray
  const [Error, setError] = useState(null)
  const [Success, setSuccess] = useState(null)

  //fetch countries
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
        setError('could not fetch countries, please ensure you are connected to the internet, then refresh the page');
      });
    }, []);
    
    
    
    // Extract selected country from the selected country
    const [selectedCountry, setSelectedCountry] = useState(''); 
    const handleDataCountrySelector = (data) => {
      setSelectedCountry(data);
    };



    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCountry, setPhoneCountry] = useState('');
    
    const handlePhoneNumberChange = (value, country) => {
    const { countryCode } = country


    // Update state with the phone number and code
    setPhoneNumber(`${countryCode}${value}`);
    setPhoneCountry(country)
  };



  //verify that phone code and selected country is the same and ensure box is checked
  const verification = phoneCountry.name?.toLowerCase() === selectedCountry?.toLowerCase()?true : false

  //check if terms and conds is ticked
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = event => {
    setChecked(event.target.checked);
  };

  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');
  
  const clearPassword = () => {
    setPassword('');
    setPasswordConfirm('');
  };
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const handleCurrencyList = (value) => {
    setSelectedCurrency(value)
}

const selectedCurrencySymbol = CurrencyMapping[selectedCurrency];



  //merging formData
  const formData2 = {
    countryName : selectedCountry,
    phoneNumber: phoneNumber,
    password: Password,
    passwordConfirm: PasswordConfirm,
    currency: selectedCurrency,
    currencySymbol: selectedCurrencySymbol
  }
  const finalFormData = {...formData, ...formData2}

  ///handle submit
  // Logic to handle signup 
  const handleSubmit = async (event) => {
    event.preventDefault();
      let response
    if (!checked) {
      setError('Please accept our privacy policy and terms of service');
      } else if (!selectedCountry) {
        setError('Please tell us your country');
      } else if (!phoneNumber) {
        setError('your phone number is required for verification');
      } else if (!verification) {
        setError(`Please select a phone number used in ${selectedCountry}`);
      }else if (finalFormData.password !== finalFormData.passwordConfirm) {
        setError('Please ensure your password and confirmed password are the same');
        clearPassword();
      }else {
        try {
            response = await fetch(baseUrl('users/signUp'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalFormData),
          });
    
          if (response.ok) {
            setError(null);
            setSuccess('Registration successful, you will be redirected shortly');  
            setTimeout(() => {
              navigate('/signIn'); 
            }, 2000); 

          }else if(!response.ok){
            const data = await response.json()
            setError(data.message)
          }
        } catch (error) {
          setError(error)
        }
      }
      messageShower(true)
     
    }
    useEffect(() => {
      handleMsgCollector(Error, Success);
    }, [Error, Success]);
    const [passwordError, setPasswordError] = useState('')
    useEffect( () => {
      if (Password.split('').length<8) {
        setPasswordError('Password must be at least 8 characters long.');
      } else {
        setPasswordError('');
      }

    }, [Password])
    
  return (
      <div className='signup-container'>
        <form onSubmit={handleSubmit}>
          <Card>
          <CardHeader
          subheader="create a free account"
          title="Get started"
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
            label="Fisrt name"
            name="firstName"
            value={formData.firstName}
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
            label="Last name"
            name="lastName"
            value={formData.lastName}
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
            label="user name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            fullWidth
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
            <CountrySelector  
            countries={countries} 
            required 
            handleDataCountrySelector = { handleDataCountrySelector }
            /></Grid>
            <Grid
                xs={12}
                md={6}
              >
            <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            fullWidth
            placeholder='Newyork'
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder='Queens'
            fullWidth
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
          <TextField
            label="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            fullWidth
            placeholder='123 Broadway'
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
          <TextField
            label="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            required
            placeholder='Apt 203'
            fullWidth
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
          <TextField
            label="Postal code or mailbox"
            name="addressCode"
            value={formData.addressCode}
            type="Number"
            onChange={handleChange}
            fullWidth
            required
          /></Grid>
          <Grid
                xs={12}
                md={6}
              >
          <PhoneInput
            name='phoneNumber'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            country={'us'} 

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
          <FormList 
          items={Currencies} 
          listCaption= 'select your currency' 
          handleListValue={handleCurrencyList}/>
          </Grid>
          <Grid
                xs={12}
                md={6}
              >
          <TextField
            label="Password"
            type="password"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              inputProps: {
                minLength: 8,
                maxLength: 20,
              },
            }}
            error={passwordError !== ''}
            helperText={passwordError}
            required
          />
          </Grid>
          <Grid
                xs={12}
                md={6}
              >

          <TextField
            label="confirm Password"
            type="password"
            name="passwordConfirm"
            value={PasswordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            fullWidth
            required
          /></Grid>
          </Grid>
        </Box>
        </CardContent>
          </Card>
          <Divider />
        <CardActions sx={{ justifyContent: 'start' }}>
          <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
          label={ <span>
            I agree to the{' '}
            <Link href="/privacy-policy" target="_blank" rel="noopener">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms-of-service" target="_blank" rel="noopener">
              Terms of Service
            </Link>
          </span>}
          />
          </CardActions>
          <CardActions sx={{ justifyContent: 'center', background: '#007bff' }}>
          <Button type="submit" variant="button" sx={{color:"white"}} >
            Sign Up
          </Button>
          </CardActions>
      <Typography variant="body1" align="center" sx={{ padding: '20px', color: '#333', cursor: 'pointer'}} >
        Already have an account? <Link onClick={() => {navigate('/signIn')}}>sign in</Link>
      </Typography>
        </form>
        </div>
  );
}
  

export default SignupForm;
