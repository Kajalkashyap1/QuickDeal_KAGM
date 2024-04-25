import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Header from "../Header/Header";
import email_icon from "../Assets/email.png";
import { ToastContainer, toast } from "react-toastify";
import passicon from "../Assets/password.png";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import style from "./resetpass.module.css";
import { useNavigate } from "react-router-dom";
import ResetPassTimer from "../Timer/ResetPasswordCountdown";

const Resetpassword = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showotpinput, setshowotpinput] = useState();
    const [isloading, setisloading] = useState();
    const [loadingText, setloadingText] = useState();
    const [passwordinputUI, setpasswordinput] = useState();
    const [otp, setotp] = useState();
    const [disable, setdisable] = useState();
    const [newpassword, setnewpassword] = useState("");
    const [OtpSent, setOtpSent] = useState(false);
    const [OTPexpirydate, setOTPexpirydate] = useState("");

    const handleTimeUp = () => {
        toast.error("OTP has been expired ! ", {
            autoClose: 1500,
            position: "top-right",
        });
        return;
    };

    const handeler = (event) => {
        setemail(event.target.value);
    };

    const handlepassword = (event) => {
        setnewpassword(event.target.value);
    };

    const handlepasswordtoggle = (event) => {
        setShowPassword(!showPassword);
    };

    // -------------------------------------------------------------------------

    axios.defaults.withCredentials = true;
    const sendotp = (e) => {
        e.preventDefault();
        setloadingText("Sending verification code on Mail...");
        setisloading(true);

        axios
            .post("http://localhost:8000/auth/resetpassword/sendotp", { email })
            .then((res) => {
                setisloading(false);
                if (res.data.status === "error") {
                    toast.error(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });
                } else {
                    toast.success(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });

                    setshowotpinput(true);
                    setdisable(true);
                    const targetDate = new Date(); // Get the current time
                    targetDate.setMinutes(targetDate.getMinutes() + 5);
                    setOTPexpirydate(targetDate);
                }
            })
            .catch((err) => {
                console.log("error while sending otp in resetpassword");
            });
    };

    // -------------------------------------------------------------------------

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setloadingText("verifing OTP..");
        setisloading(true);

        const data = { otp, email };
        axios
            .post("http://localhost:8000/auth/resetpassword/verifyotp", data)
            .then((res) => {
                setisloading(false);
                if (res.data.status === "error") {
                    // alert(res.data.message);
                    toast.error(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });
                } else {
                    // alert(res.data.message);
                    toast.success(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });
                    setshowotpinput(false);
                    setdisable(true);
                    setpasswordinput(true);
                    setOtpSent(true);
                }
            })
            .catch((err) => {
                console.log("error while verifing otp in reset password !");
            });
    };

    // -------------------------------------------------------------------------

    const updatepass = (event) => {
        event.preventDefault();
        setloadingText("Reseting Password !");
        setisloading(true);

        const data = { newpassword, email };
        axios
            .post(
                "http://localhost:8000/auth/resetpassword/updatepassword",
                data
            )
            .then((res) => {
                setisloading(false);
                if (res.data.status === "error") {
                    toast.error(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });
                } else {
                    toast.success(res.data.message, {
                        autoClose: 1500,
                        position: "top-right",
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 1700);
                    setshowotpinput(false);
                    setdisable(true);
                    setpasswordinput(true);
                }
            })
            .catch((err) => {
                console.log("error while verifing otp in reset password !");
            });
    };
    return (
        <>
            <ToastContainer autoClose="5000" theme="dark" />
            <Header></Header>
            <div className={style.center}>
                {isloading ? (
                    <>
                        <div
                            style={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                            }}>
                            <Hourglass
                                visible={true}
                                height="90"
                                width="60"
                                ariaLabel="hourglass-loading"
                                colors={["#306cce", "#72a1ed"]}
                            />
                            <br />
                            <i>
                                <h6>{loadingText}</h6>
                            </i>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={style.main}>
                            <div>
                                <div className={style.header}>
                                    <div className={style.text}>
                                        <h2>Reset Password</h2>
                                    </div>
                                    <div className={style.underline}></div>
                                </div>

                                <div className={style.container}>
                                    <span>Enter your registered email </span>
                                    <form onSubmit={sendotp}>
                                        <div className={style.input}>
                                            <img src={email_icon} alt="" />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                onChange={handeler}
                                                value={email}
                                                name="email"
                                                required
                                                disabled={disable}
                                            />
                                        </div>

                                        <button
                                            className={style.submit}
                                            type="submit"
                                            disabled={OtpSent}>
                                            {!disable
                                                ? "Get OTP"
                                                : "Resend OTP"}
                                        </button>
                                    </form>
                                </div>

                                {showotpinput && (
                                    <div className={style.container}>
                                        <span>Enter OTP</span>
                                        <form onSubmit={handleVerifyOtp}>
                                            <OtpInput
                                                value={otp}
                                                onChange={setotp}
                                                numInputs={6}
                                                renderSeparator={<span>-</span>}
                                                renderInput={(props) => (
                                                    <input
                                                        {...props}
                                                        required
                                                    />
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
                                                {/* *verification code expires in 5
                                                minutes */}
                                                <ResetPassTimer
                                                    targetDate={OTPexpirydate}
                                                    onTimeUp={handleTimeUp}
                                                />
                                            </span>
                                            <br />
                                            <button className={style.submit}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                )}
                                {passwordinputUI && (
                                    <form onSubmit={updatepass}>
                                        <div className={style.input}>
                                            <img src={passicon} alt="" />
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter new password"
                                                value={newpassword}
                                                name="newpassword"
                                                required
                                                onChange={handlepassword}
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
                                        <button className={style.submit}>
                                            Submit
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Resetpassword;
