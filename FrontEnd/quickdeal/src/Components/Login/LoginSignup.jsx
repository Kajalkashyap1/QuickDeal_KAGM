import React, { useState } from 'react'
import "./LoginSignup.css"
import email_icon from "../Assets/email.png"
import pwd_icon from "../Assets/password.png"
import user from "../Assets/person.png"
function LoginSignup () {
    const[action, setAction] = useState("Sign Up");
  return (
    <div className="container">
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>

        <div className="inputs">
            <div className="input">
                <img src={user} alt="" />
                <input type="text" placeholder='Name'/>
            </div>
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email'/>
            </div>
            <div className="input">
                <img src={pwd_icon} alt="" />
                <input type="password" placeholder='Password'/>
            </div>
        </div>
        <div className="forgot-password"><span>Forgot Password</span></div>

        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup;