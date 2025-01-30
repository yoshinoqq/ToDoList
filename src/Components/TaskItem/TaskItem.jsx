import React from "react";
import TaskButton from "../UI/Button/TaskButton";
import { useState } from "react";
import classes from "./TaskItem.module.css"
function TaskItem({ task, removeTask,  handleChangeCheckbox, handleChangeTaskBody,}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(task.body);

  return (
    <div className="task">
      <div className={classes.task_component}>
      <input
        type="checkbox"
        className="task_check"
        checked={task.checked}
        onChange={() => handleChangeCheckbox(task.id)}
      ></input>
      {isEditing ? (
        <input
          type="text"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        ></input>
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>{task.body}</div>
      )}
      </div>
      <div className={classes.task_component}>
      <div >{task.date}</div>
      
      
      {isEditing ? (
        <>
          <TaskButton onClick={() => setIsEditing(false)}>
            отмена
          </TaskButton>
          <TaskButton
            onClick={() => {
              setIsEditing(false);
              handleChangeTaskBody(newBody, task.id)

            }}
          >
            сохранить
          </TaskButton>
        </>
      ) : (
        <TaskButton
          onClick={() => removeTask(task)}
          className="task_delete_button"
          
          
        >
          🗑️
        </TaskButton>
      )}
      </div>
    </div>
  );
}
export default TaskItem;
