import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "./productdetails.css";
import Navbar from "../Navbar/Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
};

const ProductDetails = () => {
    // let id = match.params.id;
    const { id } = useParams();
    const { preview } = useParams();
    const [liked, setliked] = useState(false);

    const [item, setitem] = useState([]);
    const Navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isauth, setauth] = useState("");
    const [userid, setuserid] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                    Navigate("/");
                } else if (res.data.status === "success") {
                    setauth(true);
                    setuserid(res.data.id);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handlelike = () => {
        axios
            .post(
                `http://localhost:8000/dashboard/updatePostLikes/${id}/${userid}`
            )
            .then((res) => {
                if (res.data.status === "success") {
                    setliked(!liked);
                }
            })
            .catch((err) => {
                console.log("error in updating likes ", err.message);
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/post/${id}`)
            .then((res) => {
                setitem(res.data.info);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, liked]);

    const formattedDate = formatDate(item.date);
    const handleGetBuyerinfo = () => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                const buyer_id = res.data.id;
                Navigate(`/chat/${buyer_id}/${item.userid}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Navbar searchbar={false} />
            <div className="maincontainer">
                <div className="leftdiv">
                    <div className="image">
                        <style>
                            {`
                            .carousel-inner .carousel-item {
                                transition: transform 0.6s ease; /* Adjust transition duration */
                            }
                            `}
                        </style>
                        <Carousel>
                            {item.imageurl &&
                                item.imageurl.map((images, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            src={images}
                                            alt="item.productname"
                                            style={{
                                                width: "100%",
                                                height: "500px",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </div>
                    <br />
                    <br />
                    <div className="description">
                        <b>Description</b> <br />
                        {item.description}
                    </div>
                </div>
                <div className="rightdiv">
                    <div className="productdetails">
                        <div className="priceandheart">
                            <h1> ₹ {item.price} /-</h1>
                            {!preview && (
                                <div className="favoriteIcon">
                                    {item?.likedby?.includes(userid) ? (
                                        <Tooltip
                                            title="Remove from wishlist"
                                            onClick={handlelike}>
                                            <IconButton>
                                                <FavoriteIcon
                                                    fontSize="large"
                                                    className="likedIcon"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip
                                            title="Add to wishlist"
                                            onClick={handlelike}>
                                            <IconButton>
                                                <FavoriteBorderIcon
                                                    fontSize="large"
                                                    className="favoriteIcon"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <span className="likescount">
                                        {item.likedby?.length}
                                    </span>
                                </div>
                            )}
                        </div>
                        <hr />
                        <h4>{item.productname}</h4>
                        <p>👉 {item.adtitle}</p>
                        <p>👉 {item.description}</p>
                        <p>📅 {formattedDate}</p>
                    </div>
                    <div className="sellerinfo">
                        <h5>Seller info </h5>
                        <hr />
                        <p style={{ textTransform: "capitalize" }}>
                            <AccountCircleIcon style={{ fill: "#0072ea" }} />
                            &nbsp;
                            {item.username}
                        </p>
                        <p>
                            <EmailIcon style={{ fill: "orangered" }} />
                            &nbsp;
                            {item.useremail}
                        </p>
                        {/* <p>{item.userid}</p> */}
                        {!preview && (
                            <button
                                className="chatbutton"
                                onClick={handleGetBuyerinfo}>
                                Chat with Seller
                            </button>
                        )}
                    </div>
                    <div className="location">
                        <p>
                            <LocationOnIcon style={{ fill: "red" }} />
                            &nbsp; Location: {item.location}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
