import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "./productdetails.css";
import Header from "../Header/Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
};
const ProductDetails = () => {
    // let id = match.params.id;
    const { id } = useParams();
    const [item, setitem] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/post/${id}`)
            .then((res) => {
                setitem(res.data.info);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const formattedDate = formatDate(item.date);
    return (
        <>
            <Header></Header>
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
                        <h1> ₹ {item.price} /-</h1>
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
                        <button className="chatbutton">Chat with Seller</button>
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
