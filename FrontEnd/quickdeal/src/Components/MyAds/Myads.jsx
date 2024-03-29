import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from './Myads.module.css'
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

    return (
    <div className={style.main}>
        <Header></Header>
        <div className={style.cards}>
            <div className={style.card}>
              
                    <div className={style.product_img}>
                    <img src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"></img>
                    </div>
                    <div className={style.product_content}>
                        <div className={style.product_price}>345678909</div>
                        <div className={style.product_name}> charger </div>
                        <div className={style.product_title}>oppo 36V charger</div>
                        <div className={style.product_description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore delectus optio qui totam sed quibusdam earum, rerum, illo eligendi libero modi explicabo, exercitationem officia dicta sint recusandae suscipit! Aut.</div>
                        <div className={style.publish_date}>Published on: 589538</div>
                        <div className={style.imp_btns}>
                            <button type="submit">Mark as Sold</button>
                            <button type="submit">Edit Post</button>
                        </div>
                    </div>
                
            </div>
        </div>

    </div>
    
    
    );
};

export default Myads;
