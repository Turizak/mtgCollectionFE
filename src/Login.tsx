import React, { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { auto } from "@popperjs/core";

const Login = () => {
  // useRef hooks used for login
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  // useNavigate hook from React Router
  const navigate = useNavigate();

  // Reset token
  window.localStorage.setItem("token", "none");

  // ENV Variables
  let baseURL = import.meta.env.VITE_APIURL;

  // Login
  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    if (usernameRef?.current?.value === "") {
      alert("Username is Required!");
    } else if (passwordRef?.current?.value === "") {
      alert("Password is Required!");
    } else {
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
  }
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <form onSubmit={loginHandler}>
          <Box
            sx={{
              display: "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              label="Username"
              id="username"
              type="text"
              sx={{ width: "100%" }}
              inputRef={usernameRef}
            />
            <TextField
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
      </Container>
      <Footer />
    </>
  );
};
export default Login;
