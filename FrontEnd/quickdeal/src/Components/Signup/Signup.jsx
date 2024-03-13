import React from "react";
import "../Login/LoginSignup.css";
import email_icon from "../Assets/email.png";
import pwd_icon from "../Assets/password.png";
import user from "../Assets/person.png";
const Signupui = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>

            <form>
                <div className="inputs">
                    <div className="input">
                        <img src={user} alt="" />
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="number" placeholder="Contact Number" />
                    </div>
                    <div className="input">
                        <img src={pwd_icon} alt="" />
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="input">
                        <img src={pwd_icon} alt="" />
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                </div>
            </form>
            <div className="forgot-password">
                <span>Forgot Password</span>
            </div>
        </div>
    );
};

export default Signupui;
