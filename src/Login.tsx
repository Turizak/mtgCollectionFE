import React, { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  window.localStorage.setItem("token", "none");

  let baseURL = import.meta.env.VITE_APIURL;

  // Login

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    let response = await fetch(`${baseURL}/api/v1/login`, {
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

    let commits = await response.json();
    localStorage.setItem("token", commits.token);
    navigate("/");
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={loginHandler}>
        <Box
          sx={{
            p: 1,
            m: 1,
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            label="Username"
            id="username"
            type="text"
            ref={usernameRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            id="password"
            type="password"
            ref={passwordRef}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
