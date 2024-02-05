import React, { useState } from 'react';
import ParentComponent from '../pages/ParentComponent.jsx';

function ForgotPassword(props) {
  const [Forgotpassword, setForgotpassword] = useState(props.Forgotpassword);

  const BackToLogin = () => {
    setForgotpassword("False");

    return <LogIn LogIn="True"  />;
  };

  return (
//     Forgotpassword === "True" ?
      <div>
        <h1 className="text-center m-1">Forget password</h1>
        <div className="form-group text-start">
          <label htmlFor="Email"> Email address</label>
          <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter your email address" />
        </div>
        <div>
          <small>
            <div onClick={() => { BackToLogin() }}>
              <a className="text-sm-start m-1 t" href="#"><span>Sign in</span></a>
            </div>
          </small>
        </div>
        <button type="submit" className="btn btn-primary">confirm</button>
      </div>
  );
}

export default ForgotPassword;