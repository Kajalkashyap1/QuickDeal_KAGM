import React, { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
const Card = () => {
    const [items, setitems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/dashboard/getposts")
            .then((res) => {
                setitems(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="main">
            <h2>Filters will appear here</h2>
            <hr></hr>
            <div className="div-main">
                {items.map((item, index) => (
                    <div className="cards" key={index}>
                        <Carousel
                            prevIcon={
                                <span
                                    style={{
                                        color: "black",
                                        fontSize: "40px",
                                    }}>
                                    ‹
                                </span>
                            }
                            nextIcon={
                                <span
                                    style={{
                                        color: "black",
                                        fontSize: "40px",
                                    }}>
                                    ›
                                </span>
                            }>
                            {item.imageurl.map((images, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={images}
                                        alt="item.productname"
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        {/* <img
                            className="card-img"
                            src={item.imageurl[0]} // Assuming you have an 'image' property in your item object
                            alt={item.productName} // Assuming you have a 'productName' property in your item object
                        /> */}
                        <div className="description-content">
                            <div className="price">
                                {item.productname}
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                ₹ {item.price}/-
                            </div>
                            {/* Assuming you have a 'price' property in your item object */}
                            <div className="Ad-title">{item.adtitle}</div>
                            {/* Assuming you have an 'adTitle' property in your item object */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
