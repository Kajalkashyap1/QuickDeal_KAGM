import React from "react";
import style from "./AuctionCard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
const AuctionCard = ({ item }) => {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };
    return (
        <div className={style.main_container}>
            <div className={style.product_content}>
                <div className={style.image}>
                    <img src={item.imageurl[0]}></img>
                </div>

                {/* product price */}
                <div className={style.productrightcontent}>
                    <div className={style.product_price}>
                        <b>👉&emsp;Price:</b>₹ {item.price}
                    </div>
                    {/* products name */}
                    <div className={style.product_name}>
                        <b>&emsp;👉&emsp;Product Name:</b> {item.productname}
                    </div>
                    {/* product title */}
                    <div className={style.product_title}>
                        <b>&emsp;👉&emsp;Product Title:</b> {item.adtitle}
                    </div>
                    {/* product description */}
                    <div className={style.product_description}>
                        <b>&emsp;👉&emsp;Description:</b> {item.description}
                    </div>
                    {/* product published date */}
                    <div className={style.publish_date}>
                        <b>&emsp;👉&emsp;Published on:</b> 📅
                        {formatDate(item.date)}
                    </div>
                    <Tooltip
                        onClick={() => {
                            navigate(`/myads/preview/${item._id}/${true}`);
                        }}
                        title="View ad"
                        arrow>
                        <IconButton>
                            <VisibilityIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;
