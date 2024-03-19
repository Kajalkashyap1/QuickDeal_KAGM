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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Hourglass } from "react-loader-spinner";

const Signupui = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showotpui, setotpui] = useState(false);
    const [isloading, setloading] = useState(false);
    const [otp, setotp] = useState();
    const handlepasswordtoggle = (event) => {
        setShowPassword(!showPassword);
    };
    const [showPassword2, setShowPassword2] = useState(false);
    const handlepasswordtoggle2 = (event) => {
        setShowPassword2(!showPassword2);
    };
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

    const otphandeler = (e) => {
        setotp(e.target.value);
    };

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    //send opt and store to databse
    const submithandel = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:8000/auth/validateuser", user)
            .then((res) => {
                if (res.data.status === "success") {
                    setloading(true);
                    axios
                        .post("http://localhost:8000/auth/sendotp", user)
                        .then((res) => {
                            setloading(false);
                            if (res.data.status === "success") {
                                toast.success(res.data.message, {
                                    autoClose: 1000,
                                    position: "top-center",
                                });
                                setotpui(true);
                            } else {
                                let str = res.data.message;
                                toast.error(str, {
                                    autoClose: 1000,
                                    position: "top-center",
                                });
                            }
                        })
                        .catch((err) => {
                            setloading(false);
                            console.log(err);
                        });
                } else {
                    toast.error(res.data.message, {
                        autoClose: 1000,
                        position: "top-center",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // adding data to databse and confirming the OTP
    const submithandelregister = (event) => {
        user.inputotp = otp;
        event.preventDefault();
        axios
            .post("http://localhost:8000/auth/register", user)
            .then((res) => {
                if (res.data.status === "success") {
                    toast.success(res.data.message, {
                        autoClose: 1000,
                        position: "top-center",
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 1300);
                } else {
                    let str = res.data.message;
                    toast.error(str, {
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
            {isloading ? (
                // Loading component code here
                <>
                    <Header></Header>
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                        }}>
                        {/* <RotatingLines
                                visible={true}
                                height="96"
                                width="96"
                                strokeColor="#4a4ad2"
                                strokeWidth="5"
                                animationDuration="1"
                                ariaLabel="rotating-lines-loading"
                            /> */}
                        <Hourglass
                            visible={true}
                            height="90"
                            width="60"
                            ariaLabel="hourglass-loading"
                            colors={["#306cce", "#72a1ed"]}
                        />
                        <br />
                        <i>
                            <h6>Sending OTP on Mail...</h6>
                        </i>
                    </div>
                </>
            ) : (
                <>
                    {/* Rest of your component code */}
                    {!showotpui ? (
                        <>
                            <Header></Header>
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
                                                // onWheel={(e) => e.target.blur()}
                                            />
                                        </div>
                                        <div className="input">
                                            <img src={pwd_icon} alt="" />
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
                                                onChange={handeler}
                                                value={user.password}
                                                name="password"
                                                required
                                            />
                                            <span
                                                style={{
                                                    cursor: "pointer",
                                                    marginRight: "7px",
                                                }}
                                                onMouseDown={
                                                    handlepasswordtoggle
                                                }
                                                onMouseUp={
                                                    handlepasswordtoggle
                                                }>
                                                {showPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </span>
                                        </div>
                                        <div className="input">
                                            <img src={pwd_icon} alt="" />
                                            <input
                                                type={
                                                    showPassword2
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm Password"
                                                onChange={handeler}
                                                value={user.cnfpassword}
                                                name="cnfpassword"
                                                required
                                            />
                                            <span
                                                style={{
                                                    cursor: "pointer",
                                                    marginRight: "7px",
                                                }}
                                                onMouseDown={
                                                    handlepasswordtoggle2
                                                }
                                                onMouseUp={
                                                    handlepasswordtoggle2
                                                }>
                                                {showPassword2 ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </span>
                                        </div>
                                        <div>
                                            <button
                                                className="submit_btn"
                                                type="submit">
                                                Submit
                                            </button>
                                        </div>
                                        <Googlelogin></Googlelogin>
                                        <div>
                                            Already have an account? &emsp;
                                            <b>
                                                <NavLink
                                                    to="/login"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}>
                                                    <a>LogIn</a>
                                                </NavLink>
                                            </b>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <Header></Header>

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
                            <div className="container">
                                <div className="header">
                                    <div className="text">Enter OTP</div>
                                    <div className="underline"></div>
                                </div>

                                <form onSubmit={submithandelregister}>
                                    <div className="inputs">
                                        <div className="input">
                                            <img src={pwd_icon} alt="" />
                                            <input
                                                type="number"
                                                placeholder="Enter OPT"
                                                onChange={otphandeler}
                                                value={otp}
                                                name="contactNo"
                                                required
                                                onWheel={(e) => e.target.blur()}
                                            />
                                        </div>

                                        <div>
                                            <button
                                                className="submit_btn"
                                                type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Signupui;
