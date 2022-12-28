import React from 'react'
import deleteIcon from '../assets/icons/Delete.png';


function Tasks({handleDelete,handleUpdate,idOfTask, description, user, category, deadline }) {
  return (
    <div className="card mb-5" id={user}>
      <div className="card-header" style={{ position: "relative" }}>
        <span style={{ width: 30 }}>{category}</span>
        <span>
          <i
            className="far fa-edit my-1 fa-lg"
            onClick={()=>{handleUpdate(idOfTask,description,category,deadline)}}
            style={{
              width: 30,
              height: 30,
              display: "inline-block",
              position: "absolute",
              right: 40,
              cursor: "pointer",
              paddingRight: 40
            }}
          ></i>
        </span>
        <span>
          <img
            src={deleteIcon}
            id={idOfTask}
            alt="Delete Task"
            onClick={() => {
              handleDelete(idOfTask);
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
        <h5 className="card-title">{description}</h5>
        <p className="card-text">Deadline - {deadline}</p>
      </div>
    </div>
  );
}

export default Tasks