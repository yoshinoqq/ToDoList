import React, { use } from "react";
import TaskButton from "../UI/Button/TaskButton";
import InputTask from "../UI/Input/InputTask";
import { useState, useEffect } from "react";
import classes from "./TaskItem.module.css";
import MyEditingInput from "../MyEditingInput";


function TaskItem({
  task,
  removeTask,
  handleChangeCheckbox,
  handleChangeTaskBody,
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(task.title);
  function handleEnter(event) {
    
    if (event.key === "Enter" ) {
      setIsEditing(false);
      handleChangeTaskBody(newBody, task.id);
    }
    if (event.key === "Enter" && newBody.trim() === ""){
      setNewBody(task.title)
      setIsEditing(false)
      
    }

  }
  function handleEsc (e){
    if (e.key === "Escape" ) {
      setNewBody(task.title)
      setIsEditing(false)
    }

  }
  return (
    <div className="task">
      <div className={classes.task_component}>
        <input
          type="checkbox"
          className="task_check"
          checked={task.completed}
          onChange={() => handleChangeCheckbox(task.id)}
        ></input>
        {isEditing ? (
          <MyEditingInput type='text' value={newBody} onChange={(e) => setNewBody(e.target.value)} autoFocus onKeyDown={(e) => {
            handleEnter(e)
            handleEsc(e)
          }
          } ></MyEditingInput>
        ) : (
          <div>{task.title}</div>
          
        )}
        
      </div>
      <div className={classes.task_component}>
        <div>{task.date}</div>
        

        {isEditing ? (
          <>
            <TaskButton onClick={() =>{ 
              setNewBody(task.title)
              setIsEditing(false)}}>отмена</TaskButton>
            <TaskButton
              onClick={() =>{ 
                setIsEditing(false)
                handleChangeTaskBody(newBody,task.id)
                if(newBody.trim() === ''){
                setNewBody(task.title)
              }}}
            >
              сохранить
            </TaskButton>
          </>
        ) : (
          <>
          <TaskButton onClick={() => setIsEditing(true)}>✏️</TaskButton>
          <TaskButton
            onClick={() => removeTask(task)}
            className="task_delete_button"
          >
            🗑️
          </TaskButton>
          </>
        )}
      </div>
    </div>
  );
}
export default TaskItem;
