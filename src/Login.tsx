import React, { useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import classes from "./Login.module.css";

const Login = () => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  window.localStorage.setItem("token", "none");

  // Login

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    });
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
            ref={usernameRef}
          />
          <label htmlFor="password" className={classes.label}></label>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            ref={passwordRef}
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
