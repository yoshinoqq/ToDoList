
import TaskList from "./Components/TaskList";
import { useState } from "react";
import "./styles/App.css";

import TaskForm from "./Components/TaskForm";
import TaskButton from "./Components/UI/Button/TaskButton";
import { useEffect } from "react";
import { Pagination } from "antd";
const TASKS_PER_PAGE = 5;
function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filterdate, setFilterDate] = useState("off");
  const [currentPage, setCurrentPage] = useState(1);

  function handleChangeTaskBody(newBody, id) {
    const newTasks = tasks.map((task) => {
      console.log(newBody);
      if (task.id === id && newBody.trim() !== "") {
        task.body = newBody;
      } else if (task.id === id) {
        alert("sdf");
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
          if (task.checked === true) {
            return true;
          }
        })
        .sort((a, b) => (filterdate === "on" ? b.id - a.id : a.id - b.id));
    } else if (filter === "Undone") {
      return tasks
        .filter((task) => {
          if (task.checked === false) {
            return true;
          }
        })
        .sort((a, b) => (filterdate === "on" ? b.id - a.id : a.id - b.id));
    }
  }
  function handleChangeCheckbox(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
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
      <h1 style={{ textAlign: "center" }}>To Do</h1>
      <TaskForm create={createTask} />
      
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
      />}
    </div>
  );
}

export default App;
