import React, { useState } from "react";
import "./LoginSignup.css";
import email_icon from "../Assets/email.png";
import pwd_icon from "../Assets/password.png";
import Header from "../Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Googlelogin from "../Googlelogin/Googleloginsignup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function LoginSignup() {
    const [showPassword, setShowPassword] = useState(false);
    const handlepasswordtoggle = () => {
        setShowPassword(!showPassword);
    };
    const nevigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handeler = (event) => {
        setUser((prevstate) => {
            return {
                ...prevstate,
                [event.target.name]: event.target.value,
            };
        });
    };
    axios.defaults.withCredentials = true;
    const submithandel = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8000/auth/login", user)
            .then((res) => {
                if (res.data.status === "success") nevigate("/");
                else alert(res.data.message);
            })
            .catch((err) => console.log(err));

        setUser({ email: "", password: "" });
    };

    return (
        <>
            <Header></Header>
            <div className="container">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={submithandel}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={handeler}
                                value={user.email}
                                name="email"
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={pwd_icon} alt="" />
                            {
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    onChange={handeler}
                                    value={user.password}
                                    name="password"
                                    required
                                />
                            }
                            <span
                                style={{
                                    cursor: "pointer",
                                    marginRight: "7px",
                                }}
                                onMouseDown={handlepasswordtoggle}
                                onMouseUp={handlepasswordtoggle}>
                                {showPassword ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
                            </span>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                        <div className="forgot-password">
                            <span>Forgot Password</span>
                        </div>
                        <Googlelogin></Googlelogin>
                        <div className="submit-container">
                            <div className={"submit gray"}>
                                <NavLink
                                    style={{ textDecoration: "none" }}
                                    activeclassname="active_class"
                                    to="/signin">
                                    Sign Up
                                </NavLink>
                            </div>
                            <div className={"submit"}>
                                <NavLink
                                    style={{ textDecoration: "none" }}
                                    activeclassname="active_class"
                                    to="/login">
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginSignup;
