import React, { useEffect, useState } from "react";
import style from "./NewAuction.module.css";
import Navbar from "../../Navbar/Navbar";
import AuctionCard from "./AuctionCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewAuction = () => {
    const { userid } = useParams();
    const [ads, setads] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/myads/${userid}`)
            .then((res) => {
                setads(res.data.result);
            })
            .catch((err) => {
                console.log("error in fetching ads in newauction ", err);
            });
    }, [userid]);

    return (
        <>
            <Navbar />
            <div className={style.main_container}>
                <div className={style.left_container}>
                    <div className={style.card_container}>
                        {ads.map((item, index) => (
                            <AuctionCard item={item} />
                        ))}
                    </div>
                </div>
                {/* Add a vertical line between left and right containers */}
                <div className={style.vertical_line}></div>
                <div className={style.right_container}>right</div>
            </div>
        </>
    );
};

export default NewAuction;
