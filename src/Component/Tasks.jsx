import React from 'react'
import deleteIcon from '../assets/icons/Delete.png';


function Tasks({ description, user, category, deadline }) {
  return (
    <div className="card mb-5" id={user}>
      <div className="card-header" style={{position : "relative"}}>
        <span style={{width : 30}}>{category}</span>
        <span><img src={deleteIcon} alt="Delete Task" style={{width : 30,height : 30,display : 'inline-block',position: "absolute",right: 11}} /></span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{description}</h5>
        <p className="card-text">Deadline - {deadline}</p>
      </div>
    </div>
  );
}

export default Tasks