import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
const Googlelogin = () => {
    return <Googleloginhelp />;
};

const Googleloginhelp = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    axios.defaults.withCredentials = true;
    const sendCredentialsToServer = async (credentialResponse) => {
        try {
            // Decode the credential to extract user data
            const userdata = jwtDecode(credentialResponse.credential);
            const { email, name, picture } = userdata;
            if (!email.endsWith("@mnnit.ac.in")) {
                toast.error("Please use MNNIT email", {
                    autoClose: 2500,
                    position: "top-right",
                });
                return;
            }
            const data = { isgoogle: true, email, fullname: name, picture };

            axios
                .post("http://localhost:8000/auth/register", data)
                .then((res) => {
                    axios
                        .post("http://localhost:8000/auth/login", data)
                        .then((res) => {
                            if (res.data.status === "success") {
                                toast.success(res.data.message, {
                                    autoClose: 2500,
                                    position: "top-right",
                                });
                                setTimeout(() => {
                                    navigate("/");
                                }, 1500);
                            } else {
                                toast.error(res.data.message, {
                                    autoClose: 2500,
                                    position: "top-right",
                                });
                                return;
                            }
                        });
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.error("Error sending credentials to server:", error);
        }
    };

    return (
        <>
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
                <div>
                    <div></div>
                    <GoogleOAuthProvider
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={sendCredentialsToServer}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>
            )}
        </>
    );
};

export default Googlelogin;
