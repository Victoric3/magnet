import { TextField, Button, Link, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { React, useState, useEffect } from 'react';
import style from './utilities/signUpForm.css'; 
import { useNavigate } from 'react-router-dom';
import  useFetchUserData  from './utilities/useFetchData'
import { useAuth } from './utilities/AuthContext';


const SignInForm = ({ handleMsgCollector, messageShower }) => {
    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [isLoggedIn, setIsLoggedin] = useState('')
    const { updateAuth } = useAuth();


      //save error state and move up the tray for display
      const [Error, setError] = useState(null)
      const [Success, setSuccess] = useState(null)
      //sign in logic
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8000/api/v1/users/signIn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identity, password }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setToken(data.token)
            setIsLoggedin(true)
            setSuccess('successfully signed in')
            setTimeout(() => {
              navigate('/DashBoard'); 
            }, 2000); 
          } else {
            setError('invalid email or password')
            // Handle unsuccessful login (e.g., show error message)
          }
        } catch (error) {
          setError('something went wrong, try again later')
        }
        messageShower(true)
      };
    
    const userData = useFetchUserData(token)
    updateAuth(userData, isLoggedIn, token)
    //move it up to parent
    useEffect(() => {
          handleMsgCollector(Error, Success);
      }, [Error, Success]);
    return ( 
        <div className="signin-container" style={style}>
      <div className="signup-form">
        <h2>Log into your account</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="UserName or Email"
            name="UserName or Email"
            type="Text"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            required
          />
          
          <TextField
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <Button type="submit" variant="Button" color="primary" >
            Log In
          </Button>
        </form>
        <Typography variant="h4" align="center" sx={{ padding: '20px', color: '#333'}} >
        don't have an account? <Link href="/signUp">sign up</Link>
      </Typography>
     </div>
    </div>

     );
}
 
export default SignInForm;