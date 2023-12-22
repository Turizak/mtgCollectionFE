import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';
import { Button, TextField, Container, Box, Typography } from '@mui/material/';
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

interface LoginCredentials {
  username: string,
  password: string,
}

function Login() {
  const [disabled, setDisabled] = useState<boolean>(false)
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  })

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;

  // Login
      async function login() {
        const response = await fetch(`${baseURL}/api/v1/login`, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: `${credentials?.username}`,
            password: `${credentials?.password}`,
          }),
        });
        if (response.status != 200) {
          alert('User not found');
          setDisabled(false)
        } else {
          const commits = await response.json();
          localStorage.setItem('token', commits.token);
          localStorage.setItem('refreshToken', commits.refreshToken);
          navigate('/collection');
        }
      }
  
  function handleClick() {
    setDisabled(true);
    login()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="md">
          <Typography variant="h1" align="center" sx={{mt: 2}}>
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
                name="username"
                type="text"
                sx={{ width: '100%' }}
                onChange={handleChange}
              />
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="Password"
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
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
      </ThemeProvider>
      <Footer />
    </>
  );
}
export default Login;
