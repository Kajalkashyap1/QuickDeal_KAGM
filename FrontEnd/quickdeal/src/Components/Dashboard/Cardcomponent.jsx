import React, { useEffect, useState } from "react";
import "./card.css";

import LocationOnIcon from "@mui/icons-material/LocationOn";
const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
};

function cropText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + "...";
    }
}
const Cardcomponent = ({ onClick, usermail, item }) => {
    return (
        <>
            <div className="cards" onClick={() => onClick(item._id)}>
                <img
                    src={item.imageurl[0]}
                    alt="item.productname"
                    className="proimage"
                />
                <div className="description-content">
                    <div>
                        {/* &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  */}
                        <div className="price">₹ {item.price}/-</div>
                        <div className="product_name">{item.productname}</div>
                    </div>
                    {/* Assuming you have a 'price' property in your item object */}
                    <div className="Ad-title">{cropText(item.adtitle, 23)}</div>
                    {/* Assuming you have an 'adTitle' property in your item object */}
                    <div className="cardbottom">
                        <div className="cardlocation">
                            {item.location && (
                                <LocationOnIcon
                                    fontSize="small"
                                    style={{ fill: "red" }}
                                />
                            )}
                            {cropText(item.location, 10)}
                        </div>
                        <div className="date">{formatDate(item.date)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cardcomponent;
