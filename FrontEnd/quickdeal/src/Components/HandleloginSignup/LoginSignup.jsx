import React, { useState } from "react";
import "../Login/LoginSignup.css";
import Login from "../Login/Login";
import Signupui from "../Signup/Signup";

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    return (
        <div className="container">
            {action === "Login" ? <Login /> : <Signupui />}
            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Sign Up");
                    }}>
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Login");
                    }}>
                    Login
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
