import React from "react";
import classes from "./Input.module.css"

const input = (props) => {
  return (
    <div className = {classes.Div}>
      <input
        className = {classes.Input}
        type="number"
        placeholder="Enter any number"
        onChange= {props.changed}
        value={props.value}
      />
      <button className={classes.Button} type="submit" onClick={props.clicked}>
        Submit
      </button>
    </div>
  );
};

export default input;
