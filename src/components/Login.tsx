import React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
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
const theme = createTheme({
  palette: {
    primary: {
      main: "#BB2649",
    },
    secondary: {
      main: "#26BB98",
    },
  },
});

function Login() {
  // useRef hooks used for login
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;

  // Login
  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`${baseURL}/api/v1/login`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${usernameRef?.current?.value}`,
        password: `${passwordRef?.current?.value}`,
      }),
    });

    if (response.status != 200) {
      alert("User not found");
    } else {
      const commits = await response.json();
      localStorage.setItem("token", commits.token);
      navigate("/collection");
    }
  }

  function goToAccount() {
    navigate("/account");
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Typography variant="h3" align="center">
            MTG Collection App
          </Typography>
          <form onSubmit={loginHandler}>
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
                }}
              >
                Login
              </Button>
            </Box>
          </form>
          <br />
          <Button
            variant="contained"
            onClick={goToAccount}
            sx={{
              display: "flex",
              margin: "auto",
            }}
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
