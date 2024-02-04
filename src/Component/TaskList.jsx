import React, { useContext, useRef,useState } from "react";
import deleteIcon from "../assets/icons/Delete.png";
import taskContext from "./Context/TaskContext";
import { toast } from "react-toastify";

function Tasks({
  idOfTask,
  description,
  user,
  category,
  deadline,
  creationDate,
}) {
  const context = useContext(taskContext);
  const { editTask, Tasks, deleteTask } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    edescription: description,
    ecategory: category,
    edueDate: deadline,
  });
  const handleClick = (e) => {
    editTask(id, formData.edescription, formData.ecategory, formData.edueDate);
    toast("Task Updated");
    refClose.current.click();
  };

  const handleShowModal = (id) => {
    ref.current.click();
    // Find the task with the specified id in the Tasks array
    const taskToUpdate = Tasks.tasks.find((task) => task._id === id);
    console.log("taskToUpdate : ", taskToUpdate);
    if (taskToUpdate) {
      setFormData({
        edescription: taskToUpdate.description,
        ecategory: taskToUpdate.category,
        edueDate: taskToUpdate.dueDate,
      });
      setId(id);
      setShowModal(true);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const formatCreatedAtDate = (date) => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return new Date(date).toLocaleString("en-US", options);
    };


  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-category" id="exampleModalLabel">
                Edit Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <select
                    type="text"
                    id="ecategory"
                    name="ecategory"
                    placeholder="Choose a category"
                    className="form-select"
                    value={formData.ecategory}
                    onChange={onChange}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Public">Public</option>
                    <option value="College">College</option>
                    <option value="Work">Work</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={formData.edescription}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edueDate" className="form-input form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.edueDate}
                    onChange={onChange}
                    id="edueDate"
                    style={{ display: "block" }}
                    name="edueDate"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5" id={user}>
        <div className="card-header" style={{ position: "relative" }}>
          <span className="badge bg-primary me-2 p-2">{category}</span>
          <span>
            <i
              className="far fa-edit my-1 fa-lg"
              onClick={() => handleShowModal(idOfTask)}
              style={{
                width: 30,
                height: 30,
                display: "inline-block",
                position: "absolute",
                right: 40,
                cursor: "pointer",
                paddingRight: 40,
              }}
            ></i>
          </span>
          <span>
            <img
              src={deleteIcon}
              id={idOfTask}
              alt="Delete Task"
              onClick={() => {
                deleteTask(idOfTask);
              }}
              style={{
                width: 30,
                height: 30,
                display: "inline-block",
                position: "absolute",
                right: 11,
                bottom: 5,
                cursor: "pointer",
              }}
            />
          </span>
        </div>
        <div className="card-body">
          <h5
            className="card-category"
            style={{ margin: "10px 0", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}
          >
            {description}
          </h5>
          <p className="card-text mb-0">
            Deadline - {formatCreatedAtDate(deadline)}
          </p>
          <p className="card-text">
            Created At - {formatCreatedAtDate(creationDate)}
          </p>
        </div>
      </div>
    </>
  );
}

export default Tasks;
