import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [Signup, setSignup] = useState(false);
  const [Forgotpassword, setForgotpassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Log In</h1>
      <div className="form-group text-start ">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group text-start">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div>
        <small>
          <a className="text-sm-end m-1" href="#" onClick={() => setForgotpassword(true)}>
            <span>Forget Password</span>
          </a>
        </small>
        <small>
          <a className="text-sm-start m-1 t" href="#" onClick={() => setSignup(true)}>
            <span>SignUp</span>
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