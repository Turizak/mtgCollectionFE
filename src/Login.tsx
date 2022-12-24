import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import classes from "./Login.module.css";

const Login = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  window.localStorage.setItem("token", "none");

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredUsername(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(e.target.value);
  };

  // Login

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Card>
        <form onSubmit={loginHandler}>
          <label htmlFor="username" className={classes.label}></label>
          <input
            id="username"
            type="text"
            className={classes.input}
            placeholder="Username"
            onChange={usernameChangeHandler}
          />
          <label htmlFor="password" className={classes.label}></label>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            onChange={passwordChangeHandler}
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
