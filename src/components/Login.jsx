import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/ForgotPassword.jsx';
import ParentComponent from '../pages/ParentComponent.jsx'



function Login(props) {
  const navigate = useNavigate();
  const { updateState } = props;

  const gotoforgetpassword = () => {
    // Your conditions here
    updateState("False", "False", "True"); // Example values, update as needed
  };
   const gotosignup= () => {
    // Your conditions here
    updateState("False", "True", "False"); // Example values, update as needed
  };

  return (
    <div>
      <h1>Log In</h1>
      <form className="text-start">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          className="form-control"
          id="Password"
          placeholder="Password"
        />
      </form>
      <div>
        <small>
          <a onClick={() => gotoforgetpassword()} className="text-sm-end m-1" href="#">
            Forgot Password
          </a>
        </small>
        <small>
          <a onClick={() => gotosignup()}className="text-sm-start m-1 t" href="#">
            SignUp
          </a>
        </small>
      </div>
      <button type="submit" className="btn btn-primary" onClick={() => navigate("/homepage")}>
        Log In
      </button>
    </div>
  );
}

export default Login;