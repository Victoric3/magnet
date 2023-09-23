import { TextField, Button, Link, Typography, Box, Stack } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import Layout from './signInPageLayout'

const SignInForm = () => {
    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const { messageShower, handleMsgCollector, updateAuth, token, baseUrl } = useAuth()



      const [Error, setError] = useState(null)
      const [Success, setSuccess] = useState(null)

      //sign in logic
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(baseUrl('users/signIn'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identity, password }),
          });
    
          if (response.ok) {
            setError(null)
            const data = await response.json();
            localStorage.setItem("token", data.token)
            setSuccess('successfully signed in')
            setTimeout(() => {
              navigate('/DashBoard'); 
            }, 2000); 
          } else if(!response.ok){
            const data = await response.json()
            setError(data.message)
          }
        } catch (error) {
          setError('something went wrong')
        }
        messageShower(true)
      };
    
    //move it up to parent
    useEffect(() => {
          handleMsgCollector(Error, Success);
      }, [Error, Success])
    return ( 
        <>
       <Layout>
      <Box
      sx={{
        flex: '1 1 auto',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: '100px',
          width: '100%'
        }}
      >
        <div>
          <Stack
            spacing={1}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">
              Login
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Don&apos;t have an account?
              &nbsp;
              <Link
                href="/signUp"
                underline="hover"
                variant="subtitle2"
                sx={{cursor: 'pointer'}}
              >
                Register
              </Link>
            </Typography>
          </Stack>
          <form
              onSubmit={handleSubmit}
            >
          <Stack spacing={3}>
          <TextField
        label="UserName or Email"
        name="UserName or Email"
        type="Text"
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
        required
        fullWidth
      />
      
      <TextField
        label="password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      </Stack>
          <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
              </Button>
      </form>
        </div>
        </Box>
      </Box>
      </Layout>
      </>
     );
}
 
export default SignInForm;