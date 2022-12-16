import React, { useState } from "react";
import { toast } from "react-toastify";

const AddNote = () => {
  const [tasks, setTask] = useState({
    description: "",
    category: "Public",
    dueDate : ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    // Add Task logic
    createTask(tasks.description, tasks.category, tasks.dueDate);
    console.log(tasks);
    setTask({
      description: "",
      category: "Public",
      dueDate : ""
    });
    console.log(tasks);
  };

   const createTask = async (description, category,dueDate) => {
        //  API CALL
        const response = await fetch("http://localhost:5000/user/createtask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ description, category, dueDate }),
        });
      toast("Task Added")
      const task = await response.json();
      setTask({...tasks,...task});
    }
  
  const onChange = (e) => {
    setTask({ ...tasks, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            value={tasks.description}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="category"
            className="form-input form-label mb-2"
            id="category"
          >
            Category
          </label>
          <select
            type="text"
            id="category"
            name="category"
            placeholder="Choose a category"
            className="form-select"
            value={tasks.category}
            onChange={onChange}
          >
            <option value="Personal">Personal</option>
            <option value="Public" defaultChecked>Public</option>
            <option value="College">College</option>
            <option value="Work">Work</option>
          </select>
        </div>
        <div className="mb-3">
          <label
            htmlFor="dueDate"
            className="form-input form-label"
            id="dueDate"
          >
            Due Date
          </label>
          <input
            type="date"
            value={tasks.dueDate}
            onChange={onChange}
            id="dueDate"
            style={{ display: "block" }}
            name="dueDate"
          />
        </div>
        <button
          disabled={tasks.description.length < 5}
          type="submit"
          onClick={handleClick}
          className="btn btn-primary"
        >
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddNote;
