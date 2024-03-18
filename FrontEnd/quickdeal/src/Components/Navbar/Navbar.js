import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar(props) {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handlelogout = () => {
        axios
            .get("http://localhost:8000/auth/logout")
            .then((res) => {
                if (res.data.status === "success") {
                    navigate("/", { replace: true });
                    window.location.replace("/");
                } else alert(res.data.message);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="Header">
            <h1>QUICK DEAL</h1>
            <div className="SearchBar">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>
            {/* <a href="/">Dummy Link</a> */}
            {props.auth.isauth ? (
                <>
                    <img
                        src={props.auth.image}
                        alt={props.auth.name}
                        height="40em"
                        style={{ borderRadius: "40px" }}
                    />
                    &emsp;
                    <h1>{props.auth.name}</h1>
                    &emsp;
                    <NavLink to="/sell">
                        <button>SELL</button>
                    </NavLink>
                    <button onClick={handlelogout}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login" activeclassname="active_class">
                        <button>Login</button>
                    </NavLink>
                </>
            )}
        </div>
    );
}

export default Navbar;
