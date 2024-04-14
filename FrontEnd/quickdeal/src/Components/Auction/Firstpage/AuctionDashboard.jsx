import React, { useEffect, useState } from "react";
import style from "./liveauction.module.css";
import panda from "../../Assets/panda1.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import CountdownTimer from "../../Timer/Countdown";

const AuctionDashboard = () => {
    const { userid } = useParams();
    const navigate = useNavigate();
    const [liveAuctions, setliveauction] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/auction/getLiveAuctions")
            .then((res) => {
                if (res.data.status == "success") {
                    setliveauction(res.data.liveAuctions);
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((err) => {
                console.log(
                    "error in first page auctiondashboard ",
                    err.message
                );
            });
    }, []);
    return (
        <>
            <Navbar />
            <div className={style.auction_page}>
                <button
                    className={style.new_auction_btn}
                    onClick={() => {
                        navigate(`/NewAuction/${userid}`);
                    }}>
                    New Auction
                </button>

                <div className={style.header}>
                    <div className={style.text}>
                        <h1>Live Auctions</h1>
                    </div>
                    <div className={style.underline}></div>
                </div>
                <div className="div-main">
                    {/* Assuming each card is represented by a component */}
                    {liveAuctions.map((item, index) => {
                        return <AuctionCard item={item} userid={userid} />;
                    })}
                </div>
            </div>
        </>
    );
};

function AuctionCard({ item, userid }) {
    const [reload, setReload] = useState(false);

    // Callback function to update reload state
    const handleReload = () => {
        window.location.reload();
    };
    console.log(item);
    const navigate = useNavigate();
    return (
        <div
            className="cards"
            onClick={() => {
                navigate(`/auction_main_page/product/${item?.productid._id}`);
            }}>
            <img
                src={item?.productid.imageurl[0]}
                alt="item.productname"
                className="proimage"
            />
            <div className="description-content">
                <div>
                    {/* &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  */}
                    <div className="price">₹ {item?.amountforauction}/-</div>
                    <div className="product_name">
                        {item?.productid.productname}
                    </div>
                </div>
                {/* Assuming you have a 'price' property in your item object */}
                <div className="Ad-title">{item?.productid.adtitle}</div>
                {/* Assuming you have an 'adTitle' property in your item object */}
                <div className="cardbottom">
                    <div
                        className="date"
                        style={{ color: "red", fontSize: "large" }}>
                        Ends in :
                        <CountdownTimer
                            targetDate={item?.activetill}
                            onTimeUp={handleReload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDashboard;
