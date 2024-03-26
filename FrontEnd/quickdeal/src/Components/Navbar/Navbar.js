import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from "@mui/material";
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
            {/* <div className="SearchBar">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div> */}
            <div class="InputContainer">
                <input placeholder="Search.." id="input" class="input" name="text" type="text"/>

            </div>
            {/* <a href="/">Dummy Link</a> */}
            {props.auth.isauth ? (
                <div >
                    <img
                        src={props.auth.image}
                        alt={props.auth.name}
                        height="40em"
                        style={{ borderRadius: "40px" }}
                    />

                     {/* button for logout  */}
                     <Tooltip title="Logout" className="logout">
                        <button onClick={handlelogout}><LogoutIcon /></button>
                    </Tooltip>
                    
                    <NavLink to="/sell">
                        <button className="login-sell-btn">SELL</button>
                    </NavLink>
                    
                </div>
            ) : (
                <div >
                    <NavLink to="/login" activeclassname="active_class">
                        <button className="login-sell-btn">Login</button>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;
