import React, { useState } from "react";
import "../Login/LoginSignup.css";
import email_icon from "../Assets/email.png";
import pwd_icon from "../Assets/password.png";
import userimg from "../Assets/person.png";
import Header from "../../Components/Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Googlelogin from "../Googlelogin/Googleloginsignup";

const Signupui = () => {
    const [user, setUser] = useState({
        isgoogle: false,
        fullname: "",
        email: "",
        contactNo: "",
        password: "",
        cnfpassword: "",
    });
    const handeler = (event) => {
        setUser((prevstate) => {
            return {
                ...prevstate,
                [event.target.name]: event.target.value,
            };
        });
    };

    const nevigate = useNavigate();
    axios.defaults.withCredentials = true;
    const submithandel = (event) => {
        event.preventDefault();
        if (user.password !== user.cnfpassword) {
            toast.error("Password Did not matched ", { autoClose: 2500 });
            return;
        }
        axios
            .post("http://localhost:8000/auth/register", user)
            .then((res) => {
                if (res.data.status === "success") nevigate("/login");
                else alert(res.data.message);
            })
            .catch((err) => console.log(err));

        setUser({
            fullname: "",
            email: "",
            contactNo: "",
            password: "",
            cnfpassword: "",
        });
    };

    return (
        <>
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
            <Header></Header>
            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>

                <form onSubmit={submithandel}>
                    <div className="inputs">
                        <div className="input">
                            <img src={userimg} alt="" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                onChange={handeler}
                                value={user.fullname}
                                name="fullname"
                                required
                            />
                        </div>
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
                            <img src={email_icon} alt="" />
                            <input
                                type="number"
                                placeholder="Contact Number"
                                onChange={handeler}
                                value={user.contactNo}
                                name="contactNo"
                                required
                                onWheel={(e) => e.target.blur()}
                            />
                        </div>
                        <div className="input">
                            <img src={pwd_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={handeler}
                                value={user.password}
                                name="password"
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={pwd_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handeler}
                                value={user.cnfpassword}
                                name="cnfpassword"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                        <Googlelogin></Googlelogin>
                        <div className="forgot-password">
                            <span>Forgot Password</span>
                        </div>
                        <div className="submit-container">
                            <div className={"submit"}>
                                <NavLink
                                    style={{ textDecoration: "none" }}
                                    activeclassname="active_class"
                                    to="/signin">
                                    Sign Up
                                </NavLink>
                            </div>
                            <div className={"submit gray"}>
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
};

export default Signupui;
