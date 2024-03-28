import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Card from "./card";
import { useNavigate } from "react-router-dom";
const Home = () => {
    axios.defaults.withCredentials = true;
    const [isauth, setauth] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [image, setimage] = useState("");
    const [userid, setuserid] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                } else if (res.data.status === "success") {
                    setauth(true);
                    setuserid(res.data.id);
                    setname(res.data.name);
                    setuseremail(res.data.email);
                    setimage(res.data.image);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const authdetail = { isauth, name, useremail, image, userid };
    const navigate = useNavigate();

    const handleClick = (id) => {
        if (isauth) navigate(`/product/${id}`);
    };
    return (
        <>
            <Navbar auth={authdetail}></Navbar>
            {/* {isauth ? (
                <>
                    
                    <center>
                        <img src={image} alt={name} />
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
            )} */}

            <Card onClick={handleClick} usermail={useremail}></Card>
        </>
    );
};

export default Home;
