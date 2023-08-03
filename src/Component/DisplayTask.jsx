import React from "react";
import { useState, useEffect, useContext } from "react";
import TaskList from "./TaskList";
import "react-toastify/dist/ReactToastify.css";
import TaskContext from "./Context/TaskContext";
import { useNavigate } from "react-router-dom";

function DisplayTask() {
  const context = useContext(TaskContext);
  const { editTask, Tasks, fetchTasks } = context;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        await fetchTasks();
      } else {
        navigate("/signup");
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  console.log("TASKS : ", Tasks.tasks);
  return (
    <>
 
      <div className="container mt-5">
        <div className="row">
          {Tasks.tasks ? (
            Tasks.tasks.map((t) => {
              return (
                <div className="col-md-4">
                  <TaskList
                    key={t._id}
                    description={t.description}
                    category={t.category}
                    deadline={t.dueDate}
                    user={t.user}
                    idOfTask={t._id}
                  />
                </div>
              );
            })
          ) : (
            <div className="container">"No Tasks To Show"</div>
          )}
        </div>
      </div>
    </>
  );
}

export default DisplayTask;
