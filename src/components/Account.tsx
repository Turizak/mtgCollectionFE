import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material/';
import { useMutation } from '@tanstack/react-query';

function Account() {
  const [message, setMessage] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;
  const url = `${baseURL}/api/v1/account/create`;

  async function createAccount(body: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    manageMessage('Account Created!');
  }

  const { mutate } = useMutation({
    mutationFn: createAccount,
  });

  function manageMessage(content) {
    setMessage(content);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  // Login
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const accountObject = {
      username: `${usernameRef?.current?.value}`,
      password: `${passwordRef?.current?.value}`,
      firstName: `${firstNameRef?.current?.value}`,
      lastName: `${lastNameRef?.current?.value}`,
    };
    mutate(accountObject);
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" align="center" sx={{ mt: 2 }} gutterBottom>
          MTG Collection App
        </Typography>
        <Typography
          sx={{ display: 'flex', justifyContent: 'center', padding: 0.5 }}
        >
          <span>{message}</span>
        </Typography>
        <form onSubmit={submitHandler}>
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
            <TextField
              required
              variant="outlined"
              margin="normal"
              label="First Name"
              id="firstName"
              type="text"
              sx={{ width: '100%' }}
              inputRef={firstNameRef}
            />
            <TextField
              required
              variant="outlined"
              margin="normal"
              label="Last Name"
              id="lastName"
              type="text"
              sx={{ width: '100%' }}
              inputRef={lastNameRef}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                display: 'flex',
                margin: 'auto',
                marginTop: 2,
              }}
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              type="button"
              sx={{
                display: 'flex',
                margin: 'auto',
                marginTop: 2,
              }}
              onClick={()=> navigate('/login')}
            >
              Back to Login
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Account;
