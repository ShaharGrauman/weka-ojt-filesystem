import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/ForgotPassword.jsx';
import ParentComponent from '../pages/ParentComponent.jsx'



function Login(props) {
  const navigate = useNavigate();
  const { updateState } = props;

  const Backtologin = () => {
    // Your conditions here
    updateState(true, false, false); // Example values, update as needed
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
            <a onClick={() => Backtologin()} className="text-sm-end m-1" href="#">
              Forget Password
            </a>
          </small>
          <small>
            <a className="text-sm-start m-1 t" href="#">
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