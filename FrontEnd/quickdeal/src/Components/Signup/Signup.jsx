import React, { useState, useEffect } from "react";
import style from "../Login/LoginSignup.module.css";
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
import OtpInput from "react-otp-input";

const Signupui = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

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
                    navigate("/");
                    setauth(true);
                    setname(res.data.name);
                    setuseremail(res.data.email);
                    setimage(res.data.image);
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
        role: "",
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
                                    autoClose: 3000,
                                    position: "top-right",
                                });
                                setotpui(true);
                            } else {
                                let str = res.data.message;
                                toast.error(str, {
                                    autoClose: 3000,
                                    position: "top-rght",
                                });
                            }
                        })
                        .catch((err) => {
                            setloading(false);
                            console.log(err);
                        });
                } else {
                    toast.error(res.data.message, {
                        autoClose: 3000,
                        position: "top-right",
                    });
                }
            })
            .catch((err) => {
                console.log("first");
                console.log(err);
            });
    };

    // adding data to databse and confirming the OTP
    const submithandelregister = (event) => {
        user.inputotp = otp;
        event.preventDefault();
        console.log(user);
        axios
            .post("http://localhost:8000/auth/register", user)
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    toast.success(res.data.message, {
                        autoClose: 3000,
                        position: "top-right",
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 1300);
                } else {
                    let str = res.data.message;
                    toast.error(str, {
                        autoClose: 3000,
                        position: "top-right",
                    });
                    if (str === "OTP expired") window.location.reload();
                    return;
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                theme="dark"
            />

            {isloading ? (
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
                            <h6>Sending verification code on Mail...</h6>
                        </i>
                    </div>
                </>
            ) : (
                <>
                    {!showotpui ? (
                        <>
                            <Header></Header>
                            <div></div>
                            <div className={style.container}>
                                <div className={style.header}>
                                    <div className={style.text}>Sign Up</div>
                                    <div className={style.underline}></div>
                                </div>

                                <form onSubmit={submithandel}>
                                    <div className={style.inputs}>
                                        <div className={style.input}>
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
                                        <div className={style.input}>
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
                                        {/* <div className={style.input}>
                                            <img src={email_icon} alt="" />
                                            <input
                                                type="number"
                                                placeholder="Contact Number"
                                                onChange={handeler}
                                                value={user.contactNo}
                                                name="contactNo"
                                                
                                            />
                                        </div> */}
                                        {/* adding role file here */}

                                        <div className={style.input}>
                                            <label for="role">
                                                {" "}
                                                Your role in MNNIT:
                                            </label>

                                            <select
                                                name="role"
                                                id="role"
                                                onChange={handeler}
                                                required>
                                                <option value="">
                                                    --Please choose an option--
                                                </option>
                                                <option value="faculty">
                                                    Faculty
                                                </option>
                                                <option value="staff">
                                                    Staff
                                                </option>
                                                <option value="student">
                                                    Student
                                                </option>
                                            </select>
                                        </div>

                                        <div className={style.input}>
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
                                        <div className={style.input}>
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
                                                className={style.submit_btn}
                                                type="submit">
                                                Submit
                                            </button>
                                        </div>
                                        <Googlelogin />
                                        <div>
                                            Already have an account? &emsp;
                                            <b>
                                                <NavLink
                                                    to="/login"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}>
                                                    LogIn
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
                            <div></div>
                            <div className={style.container}>
                                <div className={style.header}>
                                    <div className={style.text}>Enter OTP</div>
                                    <div className={style.underline}></div>
                                </div>
                                <form onSubmit={submithandelregister}>
                                    <div className={style.inputs}>
                                        <OtpInput
                                            value={otp}
                                            onChange={setotp}
                                            numInputs={6}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => (
                                                <input {...props} required />
                                            )}
                                            inputStyle={{
                                                width: "40px",
                                                height: "40px",
                                                fontSize: "20px",
                                                margin: "0 10px",
                                                textAlign: "center",
                                                borderRadius: "5px",
                                                border: "1px solid #4a4360",
                                                WebkitUserSelect:
                                                    "none" /* Safari */,
                                                MozUserSelect:
                                                    "none" /* Firefox */,
                                                msUserSelect:
                                                    "none" /* IE 10+/Edge */,
                                                userSelect:
                                                    "none" /* Standard syntax */,
                                            }}
                                        />
                                        <span>
                                            *verification code expires in 5
                                            minutes
                                        </span>
                                        <div>
                                            <button
                                                className={style.submit_btn}
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
