import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" exact>
            Todo
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/"
                      exact
                    >
                       Tasks
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/user/createtask"
                    >
                      Create Task
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {!isLoggedIn ? (
              <div className="d-flex">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/about"
                >
                  About Todo
                </NavLink>
                <NavLink
                  to="auth/login"
                  role="button"
                  className="mx-2 btn btn-primary"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/auth/signup"
                  role="button"
                  className="mx-2 btn btn-primary"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="d-flex">
                <div>
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    style={{ color: "rgba(255,255,255,.55)" }}
                    to="/about"
                  >
                    About Todo
                  </NavLink>
                </div>
                <div>
                  <button className=" btn btn-primary" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
