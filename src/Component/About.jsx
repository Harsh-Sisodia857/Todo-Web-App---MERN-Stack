import React from "react";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">About Us</h2>
              <p className="card-text">
                Welcome to our To-Do website! We are dedicated to providing a
                simple and effective platform to help you organize your tasks
                and manage your day-to-day activities.
              </p>

              <p className="card-text">
                Our mission is to make task management easy and accessible for
                everyone. Whether you're a student, professional, or someone who
                loves staying organized, our to-do website is designed to meet
                your needs.
              </p>

              <h4 className="card-title">Key Features:</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  Easy task creation and management
                </li>
                <li className="list-group-item">
                  Customizable categories for better organization
                </li>
                <li className="list-group-item">
                  Deadline tracking to stay on top of your schedule
                </li>
                <li className="list-group-item">
                  User-friendly interface for a seamless experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
