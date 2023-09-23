import React, { useEffect, useState } from 'react';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import Layout from '../../utilities/layout';
import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';
import { useAuth } from '../../utilities/AuthContext'
import { CurrencyMapping } from '../../utilities/formLists';

const Account = () => {
  const { userData, baseUrl, token, handleMsgCollector, messageShower } = useAuth()
  const [values, setValues] = useState({
    firstName: `${userData.firstName}`,
    lastName: `${userData.lastName}`,
    email: `${userData.email}`,
    state: `${userData.state}`,
    city: `${userData.city}`,
    addressLine1: `${userData.addressLine1}`,
    addressLine2: `${userData.addressLine2}`,
    addressCode: parseInt(userData.addressCode, 10),
  });
  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };
  const [selectedCurrency, setSelectedCurrency] = useState(userData.currency)
  const handleCurrencyList = (value) => {
    setSelectedCurrency(value)
}

const selectedCurrencySymbol = CurrencyMapping[selectedCurrency];
const [selectedCountry, setSelectedCountry] = useState(userData.countryName); 
  
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
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [phoneCountry, setPhoneCountry] = useState(userData.phoneCountry);
    
    const handlePhoneNumberChange = (value, country) => {
      const { countryCode } = country
      setPhoneNumber(`${countryCode}${value}`);
      setPhoneCountry(country?.name)
    };
    //verify that phone code and selected country is the same and ensure box is checked
    
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    
    const form = {
      ...values,
      countryName : selectedCountry || userData.countryName,
      phoneNumber: phoneNumber || userData.phoneNumber,
      phoneCountry: phoneCountry || userData.phoneCountry,
      currency: selectedCurrency || userData.currency,
      currencySymbol: selectedCurrencySymbol || userData.currencySymbol
    }
    
    const verification = phoneCountry?.toLowerCase()=== selectedCountry?.toLowerCase()?true : false
    
    // file upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };    
     
    
    
    const handleSubmit = async(event) => {
      event.preventDefault();
      setError(null)
      setSuccess(null)
      messageShower(true)
      let response
      if(!verification){
        setError(`Ensure that your phone number is used by your country(${selectedCountry || userData.countryName})`)
        return;
      }
      
      try{
         response = await fetch(baseUrl('users/currentUser'), {
           method: 'PATCH',
           headers:{
             'Content-Type': "application/json",
             "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(form),
          })

          const imageForm = new FormData()
          imageForm.append("image", selectedFile)

          if(response.ok){
            if(!selectedFile){
              setError(null)
              setSuccess('your profile was successfully updated')
            }else{
              const responseImg = await fetch(baseUrl('users/currentUser/image'), {
                method: 'PATCH',
                headers:{
                  "Authorization": `Bearer ${token}`
                },
                body: imageForm,
              })
              if(responseImg.ok){
                setError(null)
                setSuccess('your profile was successfully updated')
              }else{
                const data = await responseImg.json()
                setError(data.message)
              }

            }
        }else if(!response.ok){
          const data = await response.json()
          setSuccess(null)
          setError(data.message)
        }
        
      }catch(e){
        setError(e.message)
      }
    
    }
    useEffect(() => {
      handleMsgCollector(error, success)
    }, [error, success])
    console.log(phoneCountry.name, selectedCountry, verification, phoneNumber, form.countryName);    
  return(

  <>
  <Layout>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile 
                handleFileChange={handleFileChange}
                selectedFileUrl={selectedFileUrl}
                selectedFile={selectedFile}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails 
                  values={values}
                  handleChange={handleChange}
                  countries={countries}
                  handleDataCountrySelector={handleDataCountrySelector}
                  handleCurrencyList={handleCurrencyList}
                  handleSubmit={handleSubmit}
                  handlePhoneNumberChange ={handlePhoneNumberChange}
                  selectedCountry={selectedCountry}
                />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
    </Layout>
  </>
  )}

export default Account;
