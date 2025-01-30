import React from "react";
import classes from './TaskButton.module.css'

// const [taskstyle, setTaskStyle] = useState(classes.ctb)
const TaskButton = ({children, className, ...props}) => {
    
    return (
    <button {...props} className={ className ? `${className} ${classes.ctb}`  : classes.ctb}>
        {children}
        </button>
    );
};
export default TaskButton;