import React, { useState } from 'react';
import { change_password } from '../Dal/data.js';

function ForgotPassword(props) {
  const [Forgotpassword, setForgotpassword] = useState(props.Forgotpassword);
  const [msg, setmsg] = useState("");

  const { updateState } = props;
  const gotologin = () => {
    // Your conditions here
    updateState("True", "False", "False"); // Example values, update as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     const response=await change_password(e.target[0].value)
     setmsg(response)
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-center m-1">Forget password</h1>
        <div className="form-group text-start">
          <label htmlFor="Email"> Email address</label>
          <input type="email" className="form-control" id="Email" name="Email" aria-describedby="emailHelp" placeholder="Enter your email address" />
        </div>
        <div>
          <small>
            <div>
              <a onClick={gotologin} className="text-sm-start m-1 t" href="#"><span>Log in</span></a>
            </div>
          </small>
        </div>
        <div>
        <div style={{ color: 'red', fontSize: 15}}>
          {msg}</div>
        <button type="submit" className="btn btn-primary">confirm</button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;