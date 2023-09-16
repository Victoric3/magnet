import { TextField, Button, Link, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { React, useState, useEffect } from 'react';
import style from './signUpForm.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import { Card, CardHeader, CardActions, Divider } from '@mui/material'


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
        <div className="signin-container" style={style}>
        <Card>
          <CardHeader
          subheader="login to continue"
          title="Sign in"
        />
        <form onSubmit={handleSubmit}>
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
        <Divider />
        <CardActions sx={{ justifyContent: 'center', background: '#007bff', marginTop: '10px'}}>
        <Button type="submit" variant="Button" color="white" >
            Log In
          </Button>
        </CardActions>
        </form>
        </Card>
        <Typography variant="body1" align="center" sx={{ padding: '20px', color: '#333', cursor: 'pointer'}} >
        don't have an account? <Link onClick={() => {navigate('/signUp')}}>sign up</Link>
      </Typography>
     </div>

     );
}
 
export default SignInForm;