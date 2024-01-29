import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material/';
import { useMutation } from '@tanstack/react-query';

function Account() {
  {
    /* Success or Error Message */
  }
  const [message, setMessage] = useState('');

  {
    /* Form Refs */
  }
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  {
    /* useNavigate hook from React Router */
  }
  const navigate = useNavigate();

  {
    /* ENV Variables */
  }
  const baseURL = import.meta.env.VITE_APIURL;
  const url = baseURL + '/api/v1/account/create';

  {
    /* Create Account POST */
  }
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

  {
    /* Message Handler */
  }
  function manageMessage(content) {
    setMessage(content);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

{/* Email Regex */}
function validateEmail(email: string) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email)
}


  {
    /* Form Submit */
  }
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
   if (!validateEmail(emailRef?.current?.value as string)) {
    manageMessage('Please enter a valid email address')
    }
    const accountObject = {
      username: `${usernameRef?.current?.value}`,
      password: `${passwordRef?.current?.value}`,
      email: `${emailRef?.current?.value}`,
    };
    mutate(accountObject);
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" align="center" sx={{ mt: 2 }} gutterBottom>
          MTG Collection App
        </Typography>
        {/* Message */}
        <Typography
          sx={{ display: 'flex', justifyContent: 'center', padding: 0.5 }}
        >
          <span>{message}</span>
        </Typography>
        {/* Form */}
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
              inputProps={{ maxLength: 15 }}
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
              label="Email"
              id="email"
              type="email"
              sx={{ width: '100%' }}
              inputRef={emailRef}
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
              onClick={() => navigate('/login')}
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
