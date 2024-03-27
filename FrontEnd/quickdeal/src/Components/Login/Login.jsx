import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import email_icon from "../Assets/email.png";
import pwd_icon from "../Assets/password.png";
import Header from "../Header/Header";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Googlelogin from "../Googlelogin/Googleloginsignup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function LoginSignup() {
    const nevigate = useNavigate();
    const [isauth, setauth] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [image, setimage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                } else if (res.data.status === "success") {
                    setauth(true);
                    setname(res.data.name);
                    setuseremail(res.data.email);
                    setimage(res.data.image);
                    nevigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const handlepasswordtoggle = () => {
        setShowPassword(!showPassword);
    };

    const handelforgetpassword = () => {
        nevigate("/resetpasscode");
    };

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
                if (res.data.status === "success") {
                    toast.success(res.data.message, {
                        autoClose: 1000,
                        position: "top-center",
                    });
                    setTimeout(() => {
                        nevigate("/");
                    }, 1500);
                    setUser({ email: "", password: "" });
                } else {
                    toast.error(res.data.message, {
                        autoClose: 1000,
                        position: "top-center",
                    });
                    return;
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition="Bounce"
                />

                <ToastContainer />
            </div>
            <Header></Header>
            <div className="wrapper">
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
                                        type={
                                            showPassword ? "text" : "password"
                                        }
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
                                <button className={"submit_btn"} type="submit">
                                    Submit
                                </button>
                            </div>
                            <div
                                className="forgot-password"
                                onClick={handelforgetpassword}>
                                <span>Forgot Password?</span>
                            </div>
                            <Googlelogin></Googlelogin>
                            <div>
                                Don't have an account? &emsp;
                                <b>
                                    <NavLink
                                        to="/signin"
                                        style={{ textDecoration: "none" }}>
                                        Sign up
                                    </NavLink>
                                </b>
                            </div>
                            {/* <div className="submit-container">
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
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginSignup;
