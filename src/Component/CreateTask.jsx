import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import TaskContext from "./Context/TaskContext";
import Joi from "joi-browser";


const AddNote = () => {
  const context = useContext(TaskContext);
  const [tasks, setTask] = useState({
    description: "",
    category: "Public",
    dueDate: "",
  });

  const [error, setError] = useState(""); // State to track form error

  const { createTask } = context;

  const schema = Joi.object({
    description: Joi.string().min(5).required().label("Description"),
    category: Joi.string()
      .valid("Public", "Personal", "College", "Work")
      .required().label("Category"),
    dueDate: Joi.date().required().label("Due Date"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the task using the schema
    const { error } = schema.validate(tasks, { abortEarly: false });
    console.log(error);
    if (error) {
      setError(error.details[0].message);
      const formErrors = {};
      for (const err of error.details) {
        toast(err.message);
        formErrors[err.path[0]] = err.message;
      }
      return;
    }

    // Add Task logic
    createTask(tasks.description, tasks.category, tasks.dueDate);
    toast("Task Created !!");
    console.log(tasks);
    setTask({
      description: "",
      category: "Public",
      dueDate: "",
    });
    setError("");
    console.log(tasks);
  };

  const onChange = (e) => {
    setTask({ ...tasks, [e.target.name]: e.target.value });
    setError("");
  };
  return (
    <div className="container">
      <form className="my-3" onSubmit={handleSubmit}>
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
            <option value="Public" defaultChecked>
              Public
            </option>
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
        <button type="submit" className="btn btn-primary">
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddNote;
