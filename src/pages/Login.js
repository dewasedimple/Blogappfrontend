import React, {  useState } from 'react';
 import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from '@react-oauth/google';

function Login(props) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  
   const handleValidation=()=>{
    if(!username && !password){
      setLoginError("username and password is required");
      return false;
    }
    if(!username){
      setLoginError("Username is required");
      return false;
    }else if(/[!@#$%^&*()_+{}[\]:;<>,.?~\\]/.test(username)){
      setLoginError("special characters are not allowed");
      return false;
    }
    if(!password){
      setLoginError("password is required");
      return false;
    }else if(password.length<8){
      setLoginError("Password must have a minimum of 8 characters");
      return false;
    }if(!username && !password){
      setLoginError("username and password is required");
      return false;
    }
    return true;
   }




  const handleLogin = (event) => {

    
    event.preventDefault(); 
  
    

    if(!handleValidation()){
      return;
    }
    const data = {username,password};
    
    axios.post('https://blog-application-lnfd.onrender.com/api/login',data)
    
    .then(response => {
      // console.log(response.data.s);
        // setUsers(response.data)
        if(response.data.username){
          // console.log()
          sessionStorage.setItem('userDetails', JSON.stringify(response.data));
          props.onLogin();
          navigate("/mainpage");
          
        }

      })
      .catch(error => { 
        
        console.log('Error fetching users:', error);
      });
   
    

  };

  const handleGoogleLogin = async () => {
    try {
      await signIn(); // Trigger Google login
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className='login-heading'>Login</h2>
      <form className="login-form" onSubmit={handleLogin}> 
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button"> {/* Use type="submit" for the button */}
          Login
        </button>
        <p className='login-p'>
          Don't have an account?{' '}<span
          className='login-span' onClick={()=>{props.toggleSignup()}} style={{cursor:'pointer'}}>sign up</span>
        </p>
      <h1>OR</h1>
      <div className='google-button'>
      <GoogleLoginButton
        clientId="522578773347-0n9hj8qpv2qig1mf7r5bb3tn5gu6n8ao.apps.googleusercontent.com"
        onSuccess={(user) => handleGoogleLogin(user)}
        onFailure={(error) => console.error('Google login failed:', error)}
      />
    </div>
    </form>
       <div className="login-error-message">{loginError}</div>
    </div>
  );
}

export default Login;