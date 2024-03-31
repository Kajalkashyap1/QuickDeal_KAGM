import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Googlelogin = () => {
    return <Googleloginhelp />;
};

const Googleloginhelp = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const sendCredentialsToServer = async (credentialResponse) => {
        try {
            // Decode the credential to extract user data
            const userdata = jwtDecode(credentialResponse.credential);
            const { email, name, picture } = userdata;
            if (!email.endsWith("@mnnit.ac.in")) {
                toast.error("Please use MNNIT email", {
                    autoClose: 1000,
                    position: "top-center",
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
                                    autoClose: 1000,
                                    position: "top-center",
                                });
                                setTimeout(() => {
                                    navigate("/");
                                }, 1500);
                            } else {
                                toast.error(res.data.message, {
                                    autoClose: 1000,
                                    position: "top-center",
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
        <div>
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
    );
};

export default Googlelogin;
