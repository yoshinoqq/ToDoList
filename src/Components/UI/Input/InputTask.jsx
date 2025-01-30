import React from "react";
import classes from './InputTask.module.css';

function InputTask(props){
    return(
        <input {...props} className={classes.it}></input>
    )
}
export default InputTask;