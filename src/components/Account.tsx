import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Box, TextField, Button, Container, Typography } from "@mui/material/";
import { useMutation } from "@tanstack/react-query";

function Account() {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;
  const url = `${baseURL}/api/v1/account/create`

  async function createAccount(body: any) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      alert("Account created!");
      navigate("/");
    }
    catch (error) {
      console.error(error)
    }
  }

  const { mutate } = useMutation({
    mutationFn: createAccount
  })

  // Login
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const accountObject = {
      username: `${usernameRef?.current?.value}`,
      password: `${passwordRef?.current?.value}`,
    }
    mutate(accountObject)
  }

  return (
    <>
        <Container maxWidth="sm" sx={{ textAlign: "center"}}>
          <Typography variant="h2" align="center" sx={{ mt: 2 }} gutterBottom>
            MTG Collection App
          </Typography>
          <form onSubmit={submitHandler}>
            <Box
              sx={{
                display: "block",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="Username"
                id="username"
                type="text"
                sx={{ width: "100%" }}
                inputRef={usernameRef}
              />
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="Password"
                id="password"
                type="password"
                sx={{ width: "100%" }}
                inputRef={passwordRef}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  display: "flex",
                  margin: "auto",
                  marginTop: 2
                }}
              >
                Create Account
              </Button>
            </Box>
          </form>
        </Container>
    </>
  );
}

export default Account;
