import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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

function Account() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // ENV Variables
  const baseURL = import.meta.env.VITE_APIURL;

  // Login
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`${baseURL}/api/v1/account/create`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${usernameRef?.current?.value}`,
        password: `${passwordRef?.current?.value}`,
        firstName: `${firstNameRef?.current?.value}`,
        lastName: `${lastNameRef?.current?.value}`,
      }),
    });
    if (response.status != 202) {
      alert("There was an issue - Please reload and try again.");
    } else {
      alert("Account created!");
      navigate("/");
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
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
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="First Name"
                id="firstname"
                type="text"
                sx={{ width: "100%" }}
                inputRef={firstNameRef}
              />
              <TextField
                required
                variant="outlined"
                margin="normal"
                label="Last Name"
                id="lastname"
                type="text"
                sx={{ width: "100%" }}
                inputRef={lastNameRef}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  display: "flex",
                  margin: "auto",
                }}
              >
                Create Account
              </Button>
            </Box>
          </form>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Account;
