import { TextField, Button, Link, Typography, Box, Stack } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import Layout from './signInPageLayout'
import Spinner from '../utilities/loader';

const SignInForm = () => {
    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const { messageShower, handleMsgCollector, baseUrl } = useAuth()
    const [loading, setLoading] = useState(false)


      const [Error, setError] = useState(null)
      const [Success, setSuccess] = useState(null)

      //sign in logic
      const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
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
            setLoading(false)
            const data = await response.json();
            localStorage.setItem("token", data.token)
            setSuccess('successfully signed in')
            setTimeout(() => {
              navigate('/DashBoard'); 
            }, 2000); 
          } else if(!response.ok){
            setLoading(false)
            const data = await response.json()
            setError(data.message)
          }
        } catch (error) {
          setError('something went wrong')
          setLoading(false)
        }
        messageShower(true)
      };
    
    //move it up to parent
    useEffect(() => {
          handleMsgCollector(Error, Success);
      }, [Error, Success, handleMsgCollector])
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
            <Typography variant="h4" sx={{color: theme=> theme.palette.text.secondary}}>
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
              {loading ? <Spinner /> : ''}
          <Stack spacing={3}>
          <TextField
            label='UserName or Email'
            name="UserName or Email"
            type="Text"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label='Password'
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
                  sx={{ mt: 3, background: theme=> theme.palette.secondary.main }}
                  type="submit"
                  variant="contained"
                  disabled={loading? true : false}
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