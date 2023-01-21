import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "./contexts/AuthContext";

const Signup = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  //   const {signup} = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    Signup(usernameRef?.current?.value, passwordRef?.current?.value);

    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords do not match!");
    }
  }

  return (
    <>
      <Paper>
        <body>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="username"
              label="username"
              inputRef={usernameRef}
            ></TextField>
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              inputRef={passwordRef}
            ></TextField>
            <TextField
              required
              id="confirm-password"
              label="Confirm Password"
              type="password"
              inputRef={passwordConfirmRef}
            ></TextField>
            <Button type="submit">Create Account</Button>
          </form>
        </body>
      </Paper>
      <div>
        <p>Already have an account? Login</p>
      </div>
    </>
  );
};

export default Signup;
