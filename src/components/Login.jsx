import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/ForgotPassword.jsx';
import ParentComponent from '../pages/ParentComponent.jsx'
import checksignin from "../Dal/data.js"

function Login(props) {
  const navigate = useNavigate();
  const { updateState } = props;
  const[errormsg,seterrormsg]=useState("")

  const gotoforgetpassword = () => {
    updateState("False", "False", "True");
  };

  const gotosignup = () => {
    updateState("False", "True", "False");
  };

  const loginfunction = (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = e.target.email.value;
    const password = e.target.Password.value;
    if (checksignin(email, password)) {
    navigate("/homepage")
//       console.log("login successful");
//       console.log(email);

    } else {
      seterrormsg("Your Password or your email is not correct")


    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form className="text-start" onSubmit={loginfunction}>
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
        <h6 className="small fst-normal text-danger">{errormsg}</h6>
        <input type="submit" value="Submit" />
      </form>

      <div>
        <small>
          <a onClick={gotoforgetpassword} className="text-sm-end m-1" href="#">
            Forgot Password
          </a>
        </small>
        <small>
          <a onClick={gotosignup} className="text-sm-start m-1 t" href="#">
            SignUp
          </a>
        </small>
      </div>
    </div>
  );
}

export default Login;
