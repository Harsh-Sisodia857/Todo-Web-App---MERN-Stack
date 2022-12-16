import React from 'react'
import { useState, useEffect } from 'react';
import Tasks from './Tasks';
import { toast } from "react-toastify";


function DisplayTask() {
  const [tasks, setTasks] = useState([]);
 
  // const deleteNote = async (id) => {
  //   // API CALL
  //   const response = await fetch(
  //     `http://localhost:5000/user/deletetask/?id=${id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     }
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   const newTasks = tasks.filter((t) => {
  //     return t._id !== id;
  //   });
  //   toast("Task is Deleted");
  //   setTasks(newTasks);
  // };

   useEffect(() => {
     if (localStorage.getItem("token")) {
       const fetchTasks = async () => {
         const response = await fetch("http://localhost:5000/user", {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
           },
         });
         const task = await response.json();
         setTasks(task);
         toast("All Tasks is Fetched");
       };
       fetchTasks();
     }
     // eslint-disable-next-line
   }, [tasks]);

  // console.log(tasks.tasks);
  return (
    <div className="container mt-5">
      <div className="row">
          {tasks.tasks ? tasks.tasks.map((t) => {
            return (
              <div className="col-md-4">  
              <Tasks
                key={t._id}
                description={t.description}
                  category={t.category}
                deadline = {t.dueDate}
                user={t.user}
              />
              </div>
            );
          }) : "No Tasks To Show"}
        </div>
    </div>
  );
}

export default DisplayTask;