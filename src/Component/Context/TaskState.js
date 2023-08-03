import TaskContext from "./TaskContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TaskState = (props) => {
    const [Tasks, setTasks] = useState([]);

    // GET ALL Tasks
    const fetchTasks = async () => {
        const response = await fetch("http://localhost:5000/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const task = await response.json();
        // console.log("Task : ",task.tasks)
        // const Fetchtasks = Tasks.concat(task)
        // console.log(Fetchtasks);
        setTasks(task);
    };


    const createTask = async (description, category, dueDate) => {
        //  API CALL
        const response = await fetch("http://localhost:5000/user/createtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ description, category, dueDate }),
        });
        const task = await response.json();
        console.log(task);
        console.log(Tasks.concat(task))
        setTasks(Tasks.concat(task));
    }

    const deleteTask = async (id) => {
        // API CALL
        const response = await fetch(
            `http://localhost:5000/user/deletetask/?id=${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            }
        );
        const json = await response.json();
        const newTasks = Tasks.tasks.filter((note) => { return note._id !== id });
        toast("Task is Deleted")
        console.log(newTasks)
        setTasks(newTasks);
    };


    const editTask = async (id,description,category, dueDate) => {
        // API CALL
        const response = await fetch(
            `http://localhost:5000/user/updatetask/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ edescription: description, ecategory: category, edueDate: dueDate }),
            }
        );
        const json = await response.json();
        console.log(json);
        let newTasks = JSON.parse(JSON.stringify(json.task));
        for (let index = 0; index < newTasks.length; index++) {
            const element = newTasks[index];
            if (element._id === id) {
                newTasks[index].category = category;
                newTasks[index].description = description;
                newTasks[index].dueDate = dueDate;
                break;
            }
        }
        setTasks(newTasks);
    };

    return (
        <TaskContext.Provider value={{ Tasks, deleteTask, fetchTasks, editTask, createTask }}>
            {props.children}
        </TaskContext.Provider>

    )
}

export default TaskState;