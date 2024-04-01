import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCardIcon from "@mui/icons-material/AddCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import admin from "../Assets/user1.png";
function Navbar(props) {
    console.log(props);
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

    const handleRedirectToEditprofile = () => {
        navigate(`/edit_profile/${props.auth.userid}`);
    };
    console.log(props);
    return (
        <div className="Header">
            <div className="logo">
                <NavLink to="/">
                    <img src="https://res.cloudinary.com/dsaaqhang/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,h_80,q_auto:best,w_140,z_2/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"></img>
                </NavLink>
            </div>
            <div class="InputContainer">
                <input
                    placeholder="Search.."
                    id="input"
                    class="input"
                    name="text"
                    type="text"
                />
            </div>
            {props.auth.isauth ? (
                <div className="profile_dragdown">
                    <NavDropdown
                        id="nav-dropdown-light-example"
                        className="custom-nav-dropdown"
                        title={
                            <>
                                <img
                                    className="admin-icon"
                                    src={admin}
                                    alt={props.auth.name}
                                    height="60em"
                                    style={{
                                        borderRadius: "40px",
                                        marginRight: "1px",
                                    }}
                                />
                                <KeyboardArrowDownIcon fontSize="large" />
                            </>
                        }
                        menuVariant="light">
                        <div
                            style={{
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            }}>
                            <div className="profilecard">
                                <div className="p-3">
                                    <div className="d-flex align-items-center p-0 ">
                                        <img
                                            src={props.auth.image}
                                            className="rounded-circle"
                                            width="58"
                                            height="54"
                                            alt={props.auth.name}
                                        />
                                        <div className="userInfo w-auto d-flex">
                                            <span
                                                className="truncate"
                                                style={{ padding: "0px" }}>
                                                {props.auth.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="viewandupdatebutton"
                                    onClick={handleRedirectToEditprofile}>
                                    View and edit profile
                                </button>
                            </div>
                            <NavDropdown.Divider />

                            <NavLink
                                to={`myads/${props.auth.userid}`}
                                className="dropdownitems">
                                &ensp;
                                <AddCardIcon
                                    fontSize="medium"
                                    style={{
                                        fill: "purple",
                                    }}
                                />
                                &emsp;
                                <span className="droptext">My ads</span>
                            </NavLink>

                            <NavLink
                                to={`/wishlist/${props.auth.userid}`}
                                className="dropdownitems">
                                &ensp;
                                <FavoriteBorderIcon
                                    fontSize="medium"
                                    style={{
                                        fill: "orangered",
                                    }}
                                />
                                &emsp;
                                <span className="droptext">Wishlist</span>
                            </NavLink>

                            <NavDropdown.Divider />
                            <NavLink
                                className="dropdownitems"
                                onClick={handlelogout}>
                                &ensp;
                                <LogoutIcon
                                    fontSize="medium"
                                    style={{
                                        fill: "#0072ea",
                                    }}
                                />
                                &emsp;
                                <span className="droptext">Logout</span>
                            </NavLink>
                        </div>
                    </NavDropdown>

                    <NavLink to="/sell">
                        <button className="login-sell-btn">SELL</button>
                    </NavLink>
                </div>
            ) : (
                <div>
                    <NavLink to="/login" activeclassname="active_class">
                        <button className="login-sell-btn">Login</button>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;
