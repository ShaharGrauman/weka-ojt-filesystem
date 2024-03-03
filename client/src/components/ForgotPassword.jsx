import React, { useState } from 'react';
import ParentComponent from '../pages/ParentComponent.jsx';

function ForgotPassword(props) {
  const [Forgotpassword, setForgotpassword] = useState(props.Forgotpassword);

  const { updateState } = props;
  const gotologin = () => {
    // Your conditions here
    updateState("True", "False", "False"); // Example values, update as needed
  };


  return (
      <div>
        <h1 className="text-center m-1">Forget password</h1>
        <div className="form-group text-start">
          <label htmlFor="Email"> Email address</label>
          <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter your email address" />
        </div>
        <div>
          <small>
            <div >
              <a onClick={() => gotologin()} className="text-sm-start m-1 t" href="#"><span>Log in</span></a>
            </div>
          </small>
        </div>
        <button type="submit" className="btn btn-primary">confirm</button>
      </div>
  );
}

export default ForgotPassword;