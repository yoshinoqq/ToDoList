import React from "react";
import TaskButton from "../UI/Button/TaskButton";
const TASKS_PER_PAGE = 5;
function Pagination({tasksLength}) {
  
  function getPages() {
     const pageCount = Math.ceil(tasksLength/ TASKS_PER_PAGE);
     const pageArr = []
     for (let i = 0; i < pageCount;i++){
        pageArr.push(i + 1)
     } 
    
     return pageArr;
  }
  const pages = getPages()

  return (
    <div> 
        {pages.map((page) => {
          return  <TaskButton>{page}</TaskButton>
        }
            
        )}
    </div>
  )
}
export default Pagination;