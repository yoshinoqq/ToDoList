import React from "react";
import { useState } from "react";
import cl from "./MyEditingInput.module.css"

function MyEditingInput(props){
    
   return( <input {...props} className={cl.mei}></input>)

}
export default MyEditingInput;