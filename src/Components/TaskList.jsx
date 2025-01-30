import React from "react";
import TaskItem from "./TaskItem/TaskItem";

const TaskList = ({tasks, removeTask, handleChangeCheckbox, handleChangeTaskBody, }) => {
    return (
        <div>

{tasks.map((task, ) => <TaskItem removeTask ={removeTask}  task={task} key={task.id} handleChangeCheckbox={handleChangeCheckbox} handleChangeTaskBody={handleChangeTaskBody}/>)}
        </div>
    )
}
export default TaskList;