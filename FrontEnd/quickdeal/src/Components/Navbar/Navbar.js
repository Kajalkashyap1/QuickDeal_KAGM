import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCardIcon from "@mui/icons-material/AddCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import admin from "../Assets/user1.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GavelIcon from "@mui/icons-material/Gavel";
import { io } from "socket.io-client";
import Categories from "../Dashboard/Categories";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ChatList } from "react-chat-elements";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ClearIcon from "@mui/icons-material/Clear";
let socket;
function Navbar({
    searchbar,
    onSearchChange,
    onCategoryFilterChange,
    message,
    buyerinfo,
    sellerinfo,
    message2,
}) {
    useEffect(() => {
        socket = io.connect("http://localhost:8000/navbar");
        return () => {
            socket.disconnect();
        };
    }, []);

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [isauth, setauth] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [image, setimage] = useState("");
    const [userid, setuserid] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [noti, setNoti] = useState([]);
    const handleSelectedCategoriesChange = (categories) => {
        const { id, checked } = categories;
        if (checked) {
            setSelectedCategories([...selectedCategories, id]);
        } else {
            setSelectedCategories(
                selectedCategories.filter((category) => category !== id)
            );
        }
    };

    const removeFilter = () => {
        onCategoryFilterChange([]);
        setSelectedCategories([]);
    };

    useEffect(() => {
        if (onCategoryFilterChange !== undefined)
            onCategoryFilterChange(selectedCategories);
    }, [selectedCategories]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                    // navigate("/login");
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
    useEffect(() => {
        socket?.emit("addUserfornotify", userid);
    }, [userid]);
    // ------------------
    useEffect(() => {
        socket?.on("notification", (message) => {
            // console.log("recievec ", message);
            setNoti(message);
        });
        socket?.on("getUsers", (message) => {
            // console.log("Members in navbar  ", message);
        });
    }, []);
    useEffect(() => {
        if (noti) setNotifications([...notifications, { noti }]);
    }, [noti]);
    // console.log(notifications);
    // ------------------
    const [arrowicon, setarrowicon] = useState(false);
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
    const handlearrow = () => {
        setarrowicon(!arrowicon);
    };
    const handleDropdownClose = () => {
        setarrowicon(false);
    };
    const handleRedirectToEditprofile = () => {
        navigate(`/edit_profile/${userid}`);
    };

    // ------------ handle search input change ---------------
    const handleInputChange = (event) => {
        const keyword = event.target.value;
        onSearchChange(keyword);
    };
    String.prototype.capitalize = function () {
        return this.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    const [mobileview, setmobileview] = useState(false);
    const toggleMobileView = () => {
        setmobileview(!mobileview);
    };
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            // If screen width is 600px or larger, set mobileView to false
            if (screenWidth >= 600) {
                setmobileview(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobileview]); // Only run this effect once after initial render
    return (
        <>
            <div className="HeaderContainer">
                <div className="Header navbar-content">
                    <div className="logo">
                        <NavLink to="/">
                            <img
                                src="https://res.cloudinary.com/dsaaqhang/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,h_80,q_auto:best,w_140,z_2/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"
                                alt="logo"></img>
                        </NavLink>
                    </div>

                    {searchbar && (
                        <div className="InputContainer hide">
                            <input
                                placeholder="Search.."
                                id="input"
                                className="input"
                                name="text"
                                type="text"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    )}

                    <div className="bellandburger">
                        {isauth ? (
                            <div className="profile_dragdown">
                                <NavDropdown
                                    // id="nav-dropdown-light-example"
                                    className="custom-nav-dropdown notificationdiv"
                                    title={
                                        <>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    display: "initial",
                                                    marginRight: "30px",
                                                    borderRadius: "50px",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}>
                                                <IconButton>
                                                    <Tooltip
                                                        title="notifications"
                                                        arrow
                                                        style={{
                                                            pointerEvents:
                                                                "none",
                                                        }}>
                                                        <Badge
                                                            badgeContent={
                                                                notifications.length -
                                                                1
                                                            }
                                                            color="error">
                                                            <NotificationsIcon
                                                                fontSize="40px" // Adjust the fontSize to a custom value
                                                                className="notify_icon"
                                                                style={{
                                                                    fill: "#ebd04b",
                                                                }}
                                                            />
                                                        </Badge>
                                                    </Tooltip>
                                                </IconButton>
                                            </div>
                                        </>
                                    }>
                                    <ul className="notificationDropdown">
                                        {notifications &&
                                            notifications.length > 0 && (
                                                <ChatList
                                                    className="chat-list"
                                                    dataSource={notifications
                                                        .map(
                                                            (data, index) =>
                                                                data.noti
                                                                    .length !==
                                                                0
                                                                    ? {
                                                                          avatar: data
                                                                              .noti
                                                                              .senderimg,
                                                                          alt: "Reactjs",
                                                                          title: data.noti.senderfullName?.capitalize(),
                                                                          subtitle:
                                                                              data
                                                                                  ?.noti
                                                                                  .message,
                                                                          date: data
                                                                              ?.noti
                                                                              .date,
                                                                          unread: 0,
                                                                      }
                                                                    : null // If data is empty array, return null
                                                        )
                                                        .filter(Boolean)} // Filter out null values
                                                />
                                            )}

                                        {((!message && !notifications) ||
                                            (notifications[0].noti.length ==
                                                0 &&
                                                notifications.length == 1)) && (
                                            <ChatList
                                                className="chat-list"
                                                dataSource={[
                                                    {
                                                        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-VoDNcIiUCfSHDAwPM2VS9uTpovBEPkIPA&s",
                                                        alt: "Reactjs",
                                                        title: "No new notifications ",
                                                        date: new Date(),
                                                        unread: 0,
                                                    },
                                                ]}
                                            />
                                        )}
                                    </ul>
                                </NavDropdown>

                                <NavDropdown
                                    id="nav-dropdown-light-example"
                                    className="custom-nav-dropdown hide"
                                    onClick={handlearrow}
                                    onTransitionEnd={handleDropdownClose}
                                    title={
                                        <>
                                            <img
                                                className="admin-icon"
                                                src={admin}
                                                alt={name}
                                                style={{
                                                    borderRadius: "40px",
                                                    marginRight: "1px",
                                                }}
                                            />
                                            {arrowicon ? (
                                                <KeyboardArrowUpIcon
                                                    fontSize="large"
                                                    style={{ fill: "white" }}
                                                />
                                            ) : (
                                                <KeyboardArrowDownIcon
                                                    fontSize="large"
                                                    style={{ fill: "white" }}
                                                />
                                            )}
                                        </>
                                    }
                                    menuVariant="light">
                                    <div
                                        style={{
                                            boxShadow:
                                                "0 0 10px rgba(0, 0, 0, 0.5)",
                                        }}>
                                        <div className="profilecard">
                                            <div className="p-3">
                                                <div className="d-flex align-items-center p-0 ">
                                                    <img
                                                        src={image}
                                                        className="rounded-circle"
                                                        width="58"
                                                        height="54"
                                                        alt={name}
                                                    />
                                                    <div className="userInfo w-auto d-flex">
                                                        <span
                                                            className="truncate"
                                                            style={{
                                                                padding: "0px",
                                                            }}>
                                                            {name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="viewandupdatebutton"
                                                onClick={
                                                    handleRedirectToEditprofile
                                                }>
                                                View and edit profile
                                            </button>
                                        </div>
                                        <NavDropdown.Divider />

                                        <NavLink
                                            to={`/myads/${userid}`}
                                            className="dropdownitems">
                                            &ensp;
                                            <AddCardIcon
                                                fontSize="medium"
                                                style={{
                                                    fill: "purple",
                                                }}
                                            />
                                            &emsp;
                                            <span className="droptext">
                                                My ads
                                            </span>
                                        </NavLink>

                                        <NavLink
                                            to={`/wishlist/${userid}`}
                                            className="dropdownitems">
                                            &ensp;
                                            <FavoriteBorderIcon
                                                fontSize="medium"
                                                style={{
                                                    fill: "orangered",
                                                }}
                                            />
                                            &emsp;
                                            <span className="droptext">
                                                Wishlist
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            to={`/AuctionDashboard/${userid}`}
                                            className="dropdownitems">
                                            &ensp;
                                            <GavelIcon
                                                fontSize="medium"
                                                style={{
                                                    fill: "red",
                                                }}
                                            />
                                            &emsp;
                                            <span className="droptext">
                                                Auction
                                            </span>
                                        </NavLink>

                                        <NavLink
                                            className="dropdownitems"
                                            to={`/chat_landing_page/${userid}`}>
                                            &ensp;
                                            <WhatsAppIcon
                                                fontSize="medium"
                                                style={{
                                                    fill: "#25D366",
                                                }}
                                            />
                                            &emsp;
                                            <span className="droptext">
                                                Chat
                                            </span>
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
                                            <span className="droptext">
                                                Logout
                                            </span>
                                        </NavLink>
                                    </div>
                                </NavDropdown>

                                <NavLink to="/sell">
                                    <button className="login-sell-btn hide">
                                        <AddIcon
                                            fontSize="medium"
                                            style={{ fill: "green" }}
                                        />
                                        SELL
                                    </button>
                                </NavLink>
                            </div>
                        ) : (
                            <div>
                                <NavLink
                                    to="/login"
                                    activeclassname="active_class">
                                    <button className="login-sell-btn hide">
                                        Login
                                    </button>
                                </NavLink>
                            </div>
                        )}
                        {/* Adding the hamburger icon here for the smaller screen size */}
                        <div className="hamburger1" onClick={toggleMobileView}>
                            <div
                                className={`hamburger ${
                                    mobileview ? "open" : ""
                                }`}>
                                {!mobileview ? (
                                    <Tooltip title="Menu" arrow>
                                        <IconButton>
                                            <MenuIcon
                                                style={{ fill: "white" }}
                                                fontSize="large"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Menu" arrow>
                                        <IconButton>
                                            <ClearIcon
                                                style={{ fill: "white" }}
                                                fontSize="large"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                            {!isauth && (
                                <NavLink
                                    to="/login"
                                    activeclassname="active_class">
                                    <button className="login-sell-btn">
                                        Login
                                    </button>
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
                {mobileview && (
                    <div className="mobileView">
                        {/* ------searchbar -------- */}

                        {isauth && (
                            <>
                                <div
                                    className="dropdownitems dropdownitems2"
                                    onClick={handleRedirectToEditprofile}>
                                    &ensp;
                                    <AccountBoxIcon
                                        fontSize="medium"
                                        style={{
                                            fill: "purple",
                                        }}
                                    />
                                    &emsp;
                                    <span className="droptext">
                                        View and edit profile
                                    </span>
                                </div>
                                <NavLink
                                    to={`/myads/${userid}`}
                                    className="dropdownitems dropdownitems2">
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
                                    to={`/wishlist/${userid}`}
                                    className="dropdownitems dropdownitems2">
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
                                <NavLink
                                    to={`/AuctionDashboard/${userid}`}
                                    className="dropdownitems dropdownitems2">
                                    &ensp;
                                    <GavelIcon
                                        fontSize="medium"
                                        style={{
                                            fill: "red",
                                        }}
                                    />
                                    &emsp;
                                    <span className="droptext">Auction</span>
                                </NavLink>

                                <NavLink
                                    className="dropdownitems dropdownitems2"
                                    to={`/chat_landing_page/${userid}`}>
                                    &ensp;
                                    <WhatsAppIcon
                                        fontSize="medium"
                                        style={{
                                            fill: "#25D366",
                                        }}
                                    />
                                    &emsp;
                                    <span className="droptext">Chat</span>
                                </NavLink>
                            </>
                        )}
                        {/* ------------logout----------- */}
                        {isauth ? (
                            <NavLink
                                className="dropdownitems dropdownitems2"
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
                        ) : (
                            <div>
                                <NavLink
                                    className="dropdownitems dropdownitems2 "
                                    to="/login">
                                    &ensp;
                                    <LogoutIcon
                                        fontSize="medium"
                                        style={{
                                            fill: "#0072ea",
                                        }}
                                    />
                                    &emsp;
                                    <span className="droptext">Login</span>
                                </NavLink>
                            </div>
                        )}
                        {searchbar && (
                            <div className="InputContainer">
                                <input
                                    placeholder="Search.."
                                    id="input"
                                    className="input"
                                    name="text"
                                    type="text"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                        )}
                        {searchbar && (
                            <Categories
                                onSelectedCategoriesChange={
                                    handleSelectedCategoriesChange
                                }
                                onClearFilter3={removeFilter}
                            />
                        )}
                    </div>
                )}
                <div className="hide">
                    {searchbar && (
                        <Categories
                            className="hide"
                            onSelectedCategoriesChange={
                                handleSelectedCategoriesChange
                            }
                            onClearFilter3={removeFilter}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;
