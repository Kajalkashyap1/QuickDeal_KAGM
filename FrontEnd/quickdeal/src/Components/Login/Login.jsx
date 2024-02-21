import React from "react";
import "./LoginSignup.css";
import email_icon from "../Assets/email.png";
import pwd_icon from "../Assets/password.png";
function LoginSignup() {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form action="">
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={pwd_icon} alt="" />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
            </form>
            <div className="forgot-password">
                <span>Forgot Password</span>
            </div>
        </div>
    );
}

export default LoginSignup;
