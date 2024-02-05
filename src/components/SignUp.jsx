import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {


  return (
    <div className="signup">

                <div>
                 <h1>Sign Up</h1>
                 <div className="form-group text-start ">
                   <label>User Name</label>
                   <input type="UserName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Name" />
                 </div>
                 <div className="form-group text-start ">
                   <label>Email address</label>
                   <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                 </div>

                 <div className="form-group text-start">
                   <label>Password</label>
                   <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                 </div>
                 <div>
{/*                    <small><a className="text-sm-end m-1" href="#"><span>Forget Password</span></a></small> */}

                   <small>
                    <div onClick={()=>{setLogin("True"),setSignup("False")}}>

                   <a className="text-sm-start m-1 t" href="#"><span>Sign In</span></a></div></small>

                 </div>
                 <button type="submit" className="btn btn-primary">Sign Up</button>
               </div>
              </div>
  );
}

export default SignUp;