import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from "@mui/material";
import logout from "../Assets/logout.jpg";
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
            <div className="logo">
                <NavLink to="/">
                    <img src="https://res.cloudinary.com/dsaaqhang/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,h_80,q_auto:best,w_140,z_2/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"></img>
                </NavLink>
            </div>
            <div class="InputContainer">
                <input placeholder="Search.." id="input" class="input" name="text" type="text"/>

            </div>
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
                        <button onClick={handlelogout}><LogoutIcon style={{ fill: '#0072ea', color: '#0072ea' }} /></button>
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
