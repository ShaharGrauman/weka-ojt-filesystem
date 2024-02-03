

import React from 'react'
import { useState } from 'react'


function ForgotPassword() {

  return(
     <div className="row shadow border border-2 justify-content-center justify-content-lg-around  m-5 " style={{backgroundColor: '#EDEDED'}}>
        <h1 className="text-center m-1">Forget password</h1>
        <div className="form-group text-start ">
          <label htmlFor="Email"> Email address</label>
          <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter your email address" />
        </div>
        <div>
          {/*              <small><a class="text-sm-end m-1" href="#"><span>Forget Password</span></a></small>*/}
          <small><a className="text-sm-start m-1 t" href="#"><span>SignUp</span></a></small>
        </div>
        <button type="submit" className="btn btn-primary">confirm</button>
      </div>

  )
}