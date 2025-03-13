import React, {useState} from 'react';
import TaskButton from './UI/Button/TaskButton';
import InputTask from './UI/Input/InputTask';

function TaskForm({create, setVisible},){
    
    const [task, setTask] = useState({title:''})
    const a = new Date()
    function addNewTask(e){
        e.preventDefault();
         const newTask ={
            ...task, id: Date.now(), completed: false, date: 
           a.getDate() + '.' + (a.getMonth() + 1) + '.' + a.getFullYear() 
         }
         if (task.title.trim() === "" ){
            setVisible("visible")
         }
         else{create(newTask)
         }
        setTask( {title: ''})
        }
        
    return(
        
        <form>
            
        <InputTask type='text' placeholder='...' value={task.title}
        onChange={e => setTask({...task, title: e.target.value})}
        ></InputTask>
        <TaskButton onClick={addNewTask}>Новая задача</TaskButton>
        </form> 
    )
}
export default TaskForm;