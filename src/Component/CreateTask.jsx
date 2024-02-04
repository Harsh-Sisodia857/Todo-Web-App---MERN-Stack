import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import TaskContext from "./Context/TaskContext";
import Joi from "joi-browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css"

const AddNote = () => {
  const context = useContext(TaskContext);
  const [tasks, setTask] = useState({
    description: "",
    category: "Personal",
    dueDate: new Date(),
  });

  const [error, setError] = useState("");

  const { createTask } = context;

  const schema = Joi.object({
    description: Joi.string().min(5).required().label("Description"),
    category: Joi.string()
      .valid("Personal", "College", "Work")
      .required()
      .label("Category"),
    dueDate: Joi.date().required().label("Due Date"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the task using the schema
    const { error } = schema.validate(tasks, { abortEarly: false });
    console.log(error);
    if (error) {
      setError(error.details[0].message);
      for (const err of error.details) {
        toast(err.message);
      }
      return;
    }

    // Add Task logic
    createTask(tasks.description, tasks.category, tasks.dueDate);
    toast("Task Created !!");
    setTask({
      description: "",
      category: "Personal",
      dueDate: new Date(),
    });
    setError("");
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate <= today) {
      toast("Due date must be greater than today");
      return;
    }

    setTask({ ...tasks, dueDate: date });
    setError("");
  };

   return (
     <div className="container mt-5">
       <form
         className="my-3 p-4 border rounded classic-background"
         onSubmit={handleSubmit}
       >
         <h2 className="mb-4">Add a New Task</h2>
         <div className="mb-3" style={{ textAlign: "left" }}>
           <label htmlFor="description" className="form-label text-start">
             Description
           </label>
           <textarea
             rows="4"
             className="form-control"
             id="description"
             name="description"
             onChange={(e) =>
               setTask({ ...tasks, description: e.target.value })
             }
             minLength={5}
             value={tasks.description}
           ></textarea>
         </div>
         <div className="mb-3" style={{ textAlign: "left" }}>
           <label
             htmlFor="category"
             className="form-label mb-2 text-start"
             id="category"
           >
             Category
           </label>
           <select
             id="category"
             name="category"
             className="form-select"
             value={tasks.category}
             onChange={(e) => setTask({ ...tasks, category: e.target.value })}
           >
             <option value="Personal">Personal</option>
             <option value="College">College</option>
             <option value="Work">Work</option>
           </select>
         </div>
         <div className="mb-3" style={{ textAlign: "left" }}>
           <label
             htmlFor="dueDate"
             className="form-label me-2 text-start"
             id="dueDate"
           >
             Due Date and Time
           </label>
           <div>
             <DatePicker
               selected={tasks.dueDate}
               onChange={handleDateChange}
               showTimeSelect
               timeFormat="HH:mm"
               timeIntervals={15}
               dateFormat="MMMM d, yyyy h:mm aa"
               className="form-control"
               style={{ width: "217px" }}
             />
           </div>
         </div>
         <button type="submit" className="btn btn-primary">
           Add Task
         </button>
       </form>
     </div>
   );

};

export default AddNote;