import React, { useContext, useRef, useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import deleteIcon from "../assets/icons/Delete.png";
import taskContext from "./Context/TaskContext";
import { toast } from "react-toastify";
import TickMark from "./Tick/Tick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

function Tasks({
  idOfTask,
  description,
  user,
  category,
  deadline,
  creationDate,
  isColor,
}) {
  const context = useContext(taskContext);
  const { editTask, Tasks, deleteTask, toggleColor } = context;
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDueDate, setEditedDueDate] = useState(new Date(deadline));

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClick = () => {
    console.log("HANDLE CLICK");
    console.log("ID: ", idOfTask);
    editTask(idOfTask, editedDescription, editedCategory, editedDueDate);
    toast("Task Updated");
    handleClose();
  };

  const handleShowModal = (id) => {
    const taskToUpdate = Tasks.find((task) => task._id === id);
    if (taskToUpdate) {
      setEditedDescription(taskToUpdate.description);
      setEditedCategory(taskToUpdate.category);
      setEditedDueDate(new Date(taskToUpdate.dueDate));
      handleShow();
    }
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
      <div className={`card mb-5 ${isColor ? "completed-task" : ""}`} id={user}>
        <div className="card-header d-flex" style={{ position: "relative" }}>
          <div>
            <span className="me-2">
              <TickMark
                onClick={() => {
                  toggleColor(idOfTask);
                }}
                colored={isColor}
              />
            </span>
            <span className="badge bg-primary p-2">{category}</span>
          </div>

          <div>
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
        </div>
        <div className="card-body">
          <h5
            className="card-category"
            style={{
              margin: "10px 0",
              borderBottom: "1px solid #ccc",
              paddingBottom: "20px",
            }}
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ecategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="College">College</option>
                <option value="Work">Work</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="edescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                minLength={5}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="edueDate">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                selected={editedDueDate}
                onChange={(date) => setEditedDueDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                style={{ width: "100%" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Tasks;