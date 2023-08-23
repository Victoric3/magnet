import { TextField, Button, Link, Typography, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import style from './utilities/signUpForm.css'; 
import CountrySelector from './utilities/countrySelector'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';




const SignupForm = ({ handleMsgCollector, messageShower }) => {

//data sent to backend
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    
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


  //merging formData
  const formData2 = {
    countryName : selectedCountry,
    phoneNumber: phoneNumber,
    password: Password,
    passwordConfirm: PasswordConfirm
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
            response = await fetch('http://localhost:8000/api/v1/users/signUp', {
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

          }else {
            setSuccess(null)
            setError('Registration failed, the userName or Email is already used by someone');
          }
        } catch (error) {
          setError('something went wrong, refresh the page and try again')
        }
      }
      messageShower(true)
     
    }
    useEffect(() => {
      handleMsgCollector(Error, Success);
    }, [Error, Success]);
 
  return (
    <div className="signup-container" style={style}>
      <div className="signup-form">
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="user name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
            <CountrySelector  
            countries={countries} 
            required 
            handleDataCountrySelector = { handleDataCountrySelector }
            />
            <PhoneInput
            name='phoneNumber'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            country={'us'} // Set the initial selected country

            inputProps={{
              className: 'form-input', // Apply your custom form input class
              style: {
                padding: '18px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                width: '92%',
                marginLeft: '8%'
                /* Add any other custom styles you need */
              },
            }}
           />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="confirm Password"
            type="password"
            name="passwordConfirm"
            value={PasswordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
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
          <Button type="submit" variant="Button" color="primary" >
            Sign Up
          </Button>
        </form>
      <Typography variant="h4" align="center" sx={{ padding: '20px', color: '#333'}} >
        Already have an account? <Link href="/sigIn">sign In</Link>
      </Typography>
      </div>
    </div>
  );
}
  

export default SignupForm;
