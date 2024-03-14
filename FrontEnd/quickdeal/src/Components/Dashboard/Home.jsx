import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
const Home = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handlelogout = () => {
        axios
            .get("http://localhost:8000/auth/logout")
            .then((res) => {
                if (res.data.status === "success") navigate("/login");
                else alert(res.data.message);
            })
            .catch((err) => console.log(err));
    };
    const [isauth, setauth] = useState("false");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
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
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {isauth ? (
                <>
                    <center>
                        <h1>
                            Welcome {name} you have logged in successfully
                            <br />
                            mail id - {useremail}
                        </h1>
                        <button onClick={handlelogout}>Logout</button>
                    </center>
                </>
            ) : (
                <>
                    <center>
                        <h1>You are not authenticated </h1>
                        <NavLink to="/login" activeclassname="active_class">
                            <button>Login</button>
                        </NavLink>
                    </center>
                </>
            )}
        </>
    );
};

export default Home;
