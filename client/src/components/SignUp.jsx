import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from "../components/Login.jsx"
import { registerUser } from '../Dal/data.js';

function SignUp(props) {
  const { updateState } = props;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

   const gotologin = () => {
    updateState("True", "False", "False"); // Example values, update as needed
  };
  const handleSignUp = async () => {
    try {
      const response = await registerUser(username, email, password);
      if (response === "User registered successfully.") {
        gotologin();
      } else {
        console.log("an error!!!")
        setErrorMessage(response);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };


  return (
    <div className="signup">

                <div>
                 <h1>Sign Up</h1>
                 <div className="form-group text-start ">
                   <label>User Name</label>
                   <input
                    type="UserName"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={username}
                    aria-describedby="emailHelp"
                    placeholder="User Name"
                    onChange={(e) => setUsername(e.target.value)}
                    />
                 </div>
                 <div className="form-group text-start ">
                   <label>Email address</label>
                   <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    />
                 </div>

                 <div className="form-group text-start">
                   <label>Password</label>
                   <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    />
                 </div>
                 {errorMessage && <div className="error-message">{errorMessage}</div>}
                 <div>

                   <small>
                    <div onClick={()=>{setLogin("True"),setSignup("False")}}>

                   <a onClick={() => gotologin()} className="text-sm-start m-1 t" href="#"><span>Log In</span></a></div></small>

                 </div>
                 <button onClick={handleSignUp} type="submit" className="btn btn-primary">Sign Up</button>
               </div>
              </div>
  );
}

export default SignUp;