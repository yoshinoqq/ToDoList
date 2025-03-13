
import TaskList from "./Components/TaskList";
import { useState } from "react";
import "./styles/App.css";
import MyModal from "./Components/MyModal";
import TaskForm from "./Components/TaskForm";
import TaskButton from "./Components/UI/Button/TaskButton";
import { useEffect } from "react";
import { Pagination } from "antd";
import { Transition } from "react-transition-group";
import axios from 'axios'
import TodosService from "./API/TodosService";
import getTodos from "./API/getTodos";
const TASKS_PER_PAGE = 7;
function App() {
  const [isTododsloading, setTodosLoading] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filterdate, setFilterDate] = useState("on");
  const [currentPage, setCurrentPage] = useState(1);
  const [warn,setWarn] = useState('none');
  useEffect( () => {
    fetchTodos()
  }, []

  )
  async function fetchTodos() {
    setTodosLoading(true)
    let todos = await getTodos()
    todos = todos.map(i => { 
      const a =  new Date()
      i.date = a.getDate() + '.' + (a.getMonth() + 1) + '.' + a.getFullYear()
      
      return i;
    
    })
    console.log(todos)
    setTasks(todos)
    setTodosLoading(false)
    
    
  }
  function handleChangeTaskBody(newBody, id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id && newBody.trim() !== "") {
        task.title = newBody;
      } else if (task.id === id) {
        
        setWarn('visible')
        // setWarn("none")
       
      }
      
      
      return task;
    })
    setTasks(newTasks);
    localStorage.setItem('task',JSON.stringify( newTasks))
  }

  function removeTask(task) {
    const newTasks = tasks.filter((t) => t.id !== task.id)
    setTasks(newTasks);
    localStorage.setItem('task',JSON.stringify(newTasks))
    
  }
  function getFilteredTasks() {
    if (filter === "All") {
      return tasks.sort((a, b) =>
        filterdate === "on" ? b.id - a.id : a.id - b.id
      );
    } else if (filter === "Done") {
      return tasks
        .filter((task) => {
          if (task.completed === true) {
            return true;
          }
        })
        .sort((a, b) => (filterdate === "on" ? b.id - a.id : a.id - b.id));
    } else if (filter === "Undone") {
      return tasks
        .filter((task) => {
          if (task.completed === false) {
            return true;
          }
        })
        .sort((a, b) => (filterdate === "on" ? b.id - a.id : a.id - b.id));
    }
  }
  function handleChangeCheckbox(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }

      return task;
    })
    setTasks(newTasks);
    localStorage.setItem('task', JSON.stringify(newTasks))
  }
  const createTask = (newTask) => {
    const newTasks = [...tasks, newTask]
    setTasks(newTasks);
    localStorage.setItem('task',
      JSON.stringify(newTasks))
  };
  const filteredTasks = getFilteredTasks();

  const slicedTasks = getFilteredTasks().slice(
    currentPage * TASKS_PER_PAGE - TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE
  );
  if (slicedTasks.length === 0 && currentPage !== 1){
    setCurrentPage(currentPage - 1)

  }
 
  
useEffect(() => {
  const savedTasks = localStorage.getItem('task');
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks || '[]'));
  }
}, []);
  return (
    <div className="App">
      
        <MyModal visib={warn} setVisible={setWarn}>Введите текст</MyModal>
        
      
      <h1 style={{ textAlign: "center" }}>To Do</h1>
      <TaskForm create={createTask} visib={warn} setVisible={setWarn} />
      
      <div className="filter">
        <div>
        <TaskButton
          onClick={() => {
            setFilter("All");
            setCurrentPage(1);
          }}
          className ={filter === "All" ? 'ctb__current' : undefined}
        >
          Все задачи
        </TaskButton>
        <TaskButton
          onClick={() => {
            setFilter("Done");
            setCurrentPage(1);
          }}
          className ={filter === "Done" ? 'ctb__current' : undefined}
        >
          Выполненные
        </TaskButton>
        <TaskButton
        className ={filter === "Undone" ? 'ctb__current' : undefined}
          onClick={() => {
            setFilter("Undone");
            setCurrentPage(1);
          }}
          
        >
          Невыполненные
        </TaskButton>
        </div>
        <div>
        <TaskButton onClick={() => setFilterDate("on")} className ={filterdate === "on" ? 'ctb__current' : undefined}>
          Cначала старые
        </TaskButton>
        <TaskButton onClick={() => setFilterDate("off")} className ={filterdate === "off" ? 'ctb__current' : undefined}>
          Сначала новые
        </TaskButton>
        </div>
      </div>
          
      {filteredTasks.length !== 0 ? (
        <TaskList
          handleChangeCheckbox={handleChangeCheckbox}
          removeTask={removeTask}
          tasks={slicedTasks}
          handleChangeTaskBody={handleChangeTaskBody}
        />
      ) : (
        <h1 style={{ textAlign: "center" }}> Нет задач</h1>
      )}
      { filteredTasks.length !== 0 && <Pagination
        className="pag"
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        defaultPageSize={TASKS_PER_PAGE}
        total={filteredTasks.length}
        showQuickJumper={true}
        showSizeChanger={false}
        style={  warn === 'visible' ? {zIndex: '-1'} : {zIndex: '0'}}
      />}

    </div>
  );
}

export default App;
