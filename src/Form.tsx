import React from "react";
import classes from "./Form.module.css";

const Form = (props: any) => {
  return <div className={classes.formContainer}>{props.children}</div>;
};

export default Form;
