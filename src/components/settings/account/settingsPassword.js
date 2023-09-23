import React, { useCallback, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuth } from '../../utilities/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SettingsPassword = () => {
    const { baseUrl, messageShower, handleMsgCollector, token, logout } = useAuth()
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  
  const [Error, setError] = useState(null)
  const [Success, setSuccess] = useState(null)
  
  const handleSubmit = async (event) => {
          event.preventDefault();
          try{
            const response = await fetch(baseUrl('users/updatePassword'), {
                method: "PATCH",
                headers: {
                  "Content-Type" : 'application/json',
                  "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(values)
            })
            if(response.ok){
                setError(null)
                const data = await response.json();
                localStorage.setItem("token", data.token)
                setSuccess('you have successfully updated your password')
            }else if(response.status === 400){
                const error = await response.json()
                setError(error.message)
            }else if(response.status === 401){
                setSuccess(null)
                setError('seems like you are not signed in')
                logout()
            }
          }catch(err){
            setError(err.message)
          }
          messageShower(true)
    };

  useEffect(() => {
    handleMsgCollector(Error, Success);
  }, [Error, Success]);
  console.log(values);
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Old Password"
              name="oldPassword"
              onChange={handleChange}
              type="password"
              value={values.oldPassword}
            />
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              onChange={handleChange}
              type="password"
              value={values.newPassword}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
