import React, { useState } from 'react';
import LogIn from '../pages/LogIn.jsx';

function ForgotPassword(props) {
  const [Forgotpassword, setForgotpassword] = useState(props.Forgotpassword);

  const BackToLogin = () => {
    setForgotpassword("False");
    // Handle navigation or rendering LogIn component
    // Example assuming LogIn is a component:
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
//     : <div></div>
  );
}

export default ForgotPassword;