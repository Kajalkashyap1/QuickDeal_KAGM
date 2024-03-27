import React, { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";

const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
};

function cropText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        // Crop the text to the desired length and append '...' to indicate it's cropped
        return text.substring(0, maxLength) + "...";
    }
}
const Card = ({ onClick, usermail }) => {
    const [items, setitems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/getposts`)
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
                {items.map(
                    (item, index) =>
                        item.useremail !== usermail && (
                            <div
                                className="cards"
                                key={index}
                                onClick={() => onClick(item._id)}>
                                <img
                                    src={item.imageurl[0]}
                                    alt="item.productname"
                                    style={{
                                        width: "100%",
                                        height: "250px",
                                        objectFit: "contain",
                                    }}
                                />
                                <div className="description-content">
                                    <div className="price">
                                        {item.productname}
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ₹{" "}
                                        {item.price}/-
                                    </div>
                                    {/* Assuming you have a 'price' property in your item object */}
                                    <div className="Ad-title">
                                        {cropText(item.adtitle, 35)}
                                    </div>
                                    {/* Assuming you have an 'adTitle' property in your item object */}
                                    <div className="date">
                                        📅{formatDate(item.date)}
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Card;
