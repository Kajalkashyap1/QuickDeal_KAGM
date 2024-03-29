import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Myads.module.css";
import Header from "../Header/Header";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

const Myads = () => {
    const { userid } = useParams();
    const [ads, setads] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/myads/${userid}`)
            .then((res) => {
                setads(res.data.result);
            })
            .catch((err) => {
                console.log("error in fetching my ads ", err);
            });
    }, []);
    console.log(ads);
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };
    return (
        <div className={style.main}>
            <Header></Header>
            <div className={style.header}>
                <div className={style.text}>MyAds</div>
                <div className={style.underline}></div>
            </div>
            {ads.map((item, index) => (
                <div className={style.cards} key={index}>
                    <div className={style.card}>
                        {/* image of the product posted by user  */}
                        <div className={style.product_img}>
                            <img src={item.imageurl[0]} height={100}></img>
                        </div>

                        {/* all the details of the product */}
                        <div className={style.product_content}>
                            {/* product price */}
                            <div className={style.product_price}>
                                <b>👉Price:</b>₹ {item.price}
                            </div>

                            {/* products name */}
                            <div className={style.product_name}>
                                <b>👉Product Name:</b> {item.productname}
                            </div>

                            {/* product title */}
                            <div className={style.product_title}>
                                <b>👉Product Title:</b> {item.adtitle}
                            </div>

                            {/* product description */}
                            <div className={style.product_description}>
                                <b>👉Description:</b> {item.description}
                            </div>

                            {/* product published date */}
                            <div className={style.publish_date}>
                                <b>👉Published on:</b> 📅{formatDate(item.date)}
                            </div>

                            <div className={style.icon_btn}>
                                <div className={style.likes}>
                                    <FavoriteIcon
                                        fontSize="large"
                                        className="likedIcon"
                                    />

                                    {item.likedby?.length}
                                </div>

                                {/* all the important links */}
                                <div className={style.imp_btns}>
                                    <button className={style.btn} type="submit">
                                        Mark as Sold
                                    </button>
                                    <button className={style.btn} type="submit">
                                        Edit Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Myads;
