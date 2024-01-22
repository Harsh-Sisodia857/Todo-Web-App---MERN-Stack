import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Todo
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Todo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/createtask">
                  Create Task
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link
                  to="auth/login"
                  role="button"
                  className="mx-2 btn btn-primary"
                >
                  Log In
                </Link>
                <Link to="/auth/signup" role="button" className="mx-2 btn btn-primary">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button className=" btn btn-primary" onClick={handleLogout}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar