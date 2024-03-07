
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import ForgotPassword from "../components/ForgotPassword.jsx";
// import Login from "../components/Login.jsx"
// import SignUp from "../components/SignUp.jsx"
import {Update_password} from "../Dal/data.js"

function Reset_password() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setmsg] = useState("");



 const UpdatePassword = async (e) => {
  e.preventDefault();
  
      const pass1=(e.target[0].value)
      const pass2=(e.target[1].value)
      var url = window.location;
      var access_token = new URLSearchParams(url.search).get('token');
      const response=await Update_password(pass1,pass2,access_token)
      setmsg(response)
  
};


return(
<>
<div>
        <meta charSet="UTF-8" />
        <title>Log In</title>
        <style dangerouslySetInnerHTML={{__html: "\n    b {\n      background-image: url('Image/bbr.jpg');\n      background-repeat: repeat-y;\n      background-size: cover; /* Resize the background image to cover the entire container */\n\n\n    }\n  " }} />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
        <div className="row  border  m-5">
          <h1 className=" text-center">
            Store your files
          </h1>
  </div>
  <div
    className="row  justify-content-center d-flex  "
    style={{ margin: 100, marginRight: 100, left: "auto" }}
  >
    <b className="row">
      <div className="col-lg-6 lead container-sm vh-60 bg-light bg-transparent  ">
        <div
          className="row shadow border border-2 justify-content-center justify-content-lg-around  m-5 "
          style={{ backgroundColor: "#EDEDED" }} >
          <h1>Reset Your Password</h1>
          <form onSubmit={UpdatePassword} >
            <div className="form-group text-start">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" className="form-control" id="newPassword" name="newPassword" aria-describedby="passwordlHelp" placeholder="Enter your Password"   />
            </div>
            <div className="form-group text-start">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="password" name="confirmpassword" aria-describedby="passwordlHelp" placeholder="Confirm your Password" />
            </div>
            <div className="form-group text-start">
              <small>
                <a className="text-sm-end m-1" href="#">
                  <span>Login</span>
                </a>
              </small>
            </div>
            <div style={{ color: 'red', fontSize: 15}}>
          {msg}</div>            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      {/*  </div>*/}
      <div className="col-lg-6 vh-60n border-start  p-3 ">
        <div className="row lead container-sm  text-dark">
          <h1>About</h1>
          <small>
            {" "}
            The web is about saving and sharing your fie File sharing allows
            users to use software that connects into a network to search for
            shared files from other users.File sharing allows users to use
            software that connects into a network to search for shared files
            from other users.
          </small>
        </div>
      </div>
    </b>
  </div>
  <footer className="text-center py-1" id="footer">
    <p>© 2024 Fyle System. All rights reserved.</p>
  </footer>
  </div>
</>
)
}

export default Reset_password;