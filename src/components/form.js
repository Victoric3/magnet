import {React, useState} from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'


const CenteredForm = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  border-radius: 8px;

`;
const CenteredFormComponent = () => {
  const UseHandleSubmit = (event) => {
    event.preventDefault();
    useNavigate('/')

    // Handle form submission logic here
  };
  const [FirstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Hobby, setHobby] = useState('');
  const [email, setEmail] = useState('');


  return (
    <CenteredForm>
      <FormContainer onSubmit={UseHandleSubmit}>
        <Typography
        variant='h4'
        component='h2'
        color='textSecondary'
        >
          create your account
         </Typography>
        <TextField
        label="First Name" 
        variant="outlined" 
        value={FirstName} 
        onChange={e => setFirstName(e.target.value)}
        placeholder='Georgina'
        required/>
        <TextField 
        label="Last Name" 
        variant="outlined" 
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder='Augustin'
        required/>
        <TextField 
        label="Hobby" 
        variant="outlined" 
        value={Hobby}
        onChange={e => setHobby(e.target.value)}
        placeholder='jacking😂'
        required/>
        <TextField 
        label="Email" 
        variant="outlined" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        required/>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </FormContainer>
    </CenteredForm>
  );
};

export default CenteredFormComponent;
