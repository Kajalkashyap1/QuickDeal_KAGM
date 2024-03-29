import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Myads.module.css";
import Header from "../Header/Header";

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
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };
    return (
        <div className={style.main}>
            <Header></Header>
            {ads.map((item, index) => (
                <div className={style.cards} key={index}>
                    <div className={style.card}>
                        <div className={style.product_img}>
                            <img src={item.imageurl[0]} height={100}></img>
                        </div>
                        <div className={style.product_content}>
                            <div className={style.product_price}>
                                {item.price}
                            </div>
                            <div className={style.product_name}>
                                {item.productname}
                            </div>
                            <div className={style.product_title}>
                                {item.adtitle}
                            </div>
                            <div className={style.product_description}>
                                {item.description}
                            </div>
                            <div className={style.publish_date}>
                                Published on: {formatDate(item.date)}
                            </div>
                            <div className={style.imp_btns}>
                                <button type="submit">Mark as Sold</button>
                                <button type="submit">Edit Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Myads;
