import React, {useState} from 'react';
import TaskButton from './UI/Button/TaskButton';
import InputTask from './UI/Input/InputTask';

function TaskForm({create},){
    
    const [task, setTask] = useState({body:''})
    const a = new Date()
    function addNewTask(e){
        e.preventDefault();
         const newTask ={
            ...task, id: Date.now(), checked: false, date: 
           a.getDate() + '.' + (a.getMonth() + 1) + '.' + a.getFullYear() 
         }
         if (task.body.trim() === "" ){
            alert('Введите текст')
         }
         else{create(newTask)
         }
        setTask( {body: ''})
        }
        
    return(
        
        <form>
            
        <InputTask type='text' placeholder='...' value={task.body}
        onChange={e => setTask({...task, body: e.target.value})}
        ></InputTask>
        <TaskButton onClick={addNewTask}>Новая задача</TaskButton>
        </form> 
    )
}
export default TaskForm;