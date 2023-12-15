/* eslint-disable no-inner-declarations */
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './material ui/Theme';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

function Login() {
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(false)

  // useRef hooks used for login
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;

  // Login
  useEffect(()=>{
    if (clicked) {
      async function login() {
        const response = await fetch(`${baseURL}/api/v1/login`, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: `${usernameRef?.current?.value}`,
            password: `${passwordRef?.current?.value}`,
          }),
        });
        if (response.status != 200) {
          alert('User not found');
          setClicked(false)
          setDisabled(false)
        } else {
          const commits = await response.json();
          localStorage.setItem('token', commits.token);
          localStorage.setItem('refreshToken', commits.refreshToken);
          navigate('/collection');
        }
      }
      login()
    }
  }, [clicked])
  
  function handleClick() {
    setClicked(true);
    setDisabled(true);
  }

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center">
            MTG Collection App
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
                type="password"
                sx={{ width: '100%' }}
                inputRef={passwordRef}
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
      </ThemeProvider>
      <Footer />
    </>
  );
}
export default Login;
