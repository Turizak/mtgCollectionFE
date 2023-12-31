import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Button, TextField, Container, Box, Typography } from '@mui/material/';
import { useMutation } from '@tanstack/react-query';

// Types
type LoginCredentials = {
  username: string;
  password: string;
};

function Login() {
  const [message, setMessage] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // Calling custom hook(s)
const { auth, setAuth } = useContext(AuthContext)

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;

  // Login
  const { mutate } = useMutation({
    mutationFn: login,
  });

  async function login(body: LoginCredentials) {
    try {
      const response = await fetch(`${baseURL}/api/v1/login`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
      throw new Error(`${response.status}`)
    }
    const commits = await response.json();
    const accessToken = commits.token
    const refreshToken = commits.refreshToken
    setAuth({ accessToken, refreshToken })
    navigate('/')
    console.log('Access Token Granted')
    } 
    catch (error) {
      console.error(error)
      manageMessage(`${error}`)
      setDisabled(false)
    }
  }

  function manageMessage(content) {
    setMessage(content)
    setTimeout(()=> {
      setMessage('')
    }, 3000)
  }

  function handleClick() {
    setDisabled(true);
    const loginObject: LoginCredentials = {
      username: `${usernameRef?.current?.value}`,
      password: `${passwordRef?.current?.value}`,
    };
    mutate(loginObject);
  }

  return (
    <>
        <Container maxWidth="md" sx={{height: "88dvh"}}>
          <Typography variant="h2" align="center" sx={{ mt: 2 }}>
            MTG Collection App
          </Typography>
          <Typography variant="h4" sx={{display: 'flex', justifyContent: 'center', padding: 2}}>
            <span>{message}</span>
          </Typography>
          <form>
            <Box
              sx={{
                display: 'block',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="Username"
                id="username"
                name="username"
                type="text"
                sx={{ width: '100%' }}
                inputRef={usernameRef}
              />
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="Password"
                id="password"
                name="password"
                type="password"
                inputRef={passwordRef}
                sx={{ width: '100%' }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  display: 'flex',
                  margin: 'auto',
                }}
                onClick={handleClick}
                disabled={disabled}
              >
                {disabled === false ? 'Login' : 'Loading...'}
              </Button>
            </Box>
          </form>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              navigate('/account');
            }}
            sx={{
              display: 'flex',
              margin: 'auto',
            }}
            disabled={disabled}
          >
            Create Account
          </Button>
          <br />
        </Container>
    </>
  );
}
export default Login;
