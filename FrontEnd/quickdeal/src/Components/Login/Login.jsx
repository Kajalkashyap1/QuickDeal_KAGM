import React, { useState, useEffect } from "react";
import style from "./LoginSignup.module.css";
import email_icon from "../Assets/email.png";
import pwd_icon from "../Assets/password.png";
import Header from "../Header/Header";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Googlelogin from "../Googlelogin/Googleloginsignup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Footer from "../Footer/Footer";
import { Oval } from "react-loader-spinner";
function LoginSignup() {
    // const [isToastActive, setIsToastActive] = useState();
    const nevigate = useNavigate();
    const [isauth, setauth] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [image, setimage] = useState("");
    const [loading, setloading] = useState(true);
    useEffect(() => {
        setloading(true);
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                    setloading(false);
                } else if (res.data.status === "success") {
                    setauth(true);
                    setname(res.data.name);
                    setuseremail(res.data.email);
                    setimage(res.data.image);
                    nevigate("/");
                    setloading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setloading(false);
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
        setloading(true);
        event.preventDefault();
        axios
            .post("http://localhost:8000/auth/login", user)
            .then((res) => {
                if (res.data.status === "success") {
                    toast.success(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });
                    setTimeout(() => {
                        nevigate("/");
                    }, 1700);
                    setUser({ email: "", password: "" });
                } else {
                    toast.error(res.data.message, {
                        autoClose: 3000,
                        position: "top-right",
                    });
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setloading(false);
            });
    };

    return (
        <>
            {" "}
            <ToastContainer autoClose="5000" theme="dark" />
            {loading ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="purple"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <br />
                    <i>loading..</i>
                </div>
            ) : (
                <>
                    <Header></Header>

                    <div className={style.wrapper}>
                        <div className={style.container}>
                            <div className={style.header}>
                                <div className={style.text}>Login</div>
                                <div className={style.underline}></div>
                            </div>
                            <form onSubmit={submithandel}>
                                <div className={style.inputs}>
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
                                    <div className={style.input}>
                                        <img src={pwd_icon} alt="" />
                                        {
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
                                        }
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                marginRight: "7px",
                                            }}
                                            onClick={handlepasswordtoggle}>
                                            {showPassword ? (
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
                                    <div
                                        className={style.forgot_password}
                                        onClick={handelforgetpassword}>
                                        <span>Forgot Password?</span>
                                    </div>
                                    <Googlelogin></Googlelogin>
                                    <div>
                                        Don't have an account? &emsp;
                                        <b>
                                            <NavLink
                                                to="/signin"
                                                style={{
                                                    textDecoration: "none",
                                                }}>
                                                Sign up
                                            </NavLink>
                                        </b>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div>{/* <Footer /> */}</div>
                    </div>
                </>
            )}
        </>
    );
}

export default LoginSignup;
