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
    const [pastAuctions, setpastauction] = useState([]);
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
    useEffect(() => {
        axios
            .get("http://localhost:8000/auction/getPastAuctions")
            .then((res) => {
                if (res.data.status == "success") {
                    setpastauction(res.data.liveAuctions);
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((err) => {
                console.log(
                    "error in first page past auctiondashboard ",
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
                        return (
                            <AuctionCard
                                item={item}
                                userid={userid}
                                key={index}
                            />
                        );
                    })}
                    {!liveAuctions.length && (
                        <div className="card" style={{ width: "38rem" }}>
                            <div className="card-body">
                                <h5 style={{ color: "orangered" }}>
                                    <center>No live auctions found</center>
                                </h5>
                                <h5 className="card-title placeholder-glow">
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-8"></span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <br />

                {/* ----------------------- past auction section ----------------- */}
                <div className={style.header}>
                    <div className={style.text}>
                        <h1>Past Auctions</h1>
                    </div>
                    <div className={style.underline}></div>
                </div>
                <div className="div-main">
                    {/* Assuming each card is represented by a component */}
                    {pastAuctions.map((item, index) => {
                        return (
                            <AuctionCardPastAuction
                                item={item}
                                userid={userid}
                                key={index}
                            />
                        );
                    })}
                    {!pastAuctions.length && (
                        <div
                            className="card"
                            aria-hidden="true"
                            style={{ width: "38rem" }}>
                            <div className="card-body">
                                <h5 style={{ color: "orangered" }}>
                                    <center>No live auctions found</center>
                                </h5>
                                <h5 className="card-title placeholder-glow">
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-8"></span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

function AuctionCard({ item, userid }) {
    // Callback function to update reload state
    const handleReload = () => {
        window.location.reload();
    };
    const navigate = useNavigate();
    return (
        <div
            className="cards"
            onClick={() => {
                navigate(`/auction_main_page/product/${item?._id}`);
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

function AuctionCardPastAuction({ item, userid }) {
    // Callback function to update reload state
    const handleReload = () => {
        const a = 0;
    };
    const navigate = useNavigate();
    return (
        <div
            className="cards"
            onClick={() => {
                navigate(`/auction_main_page/product/${item?._id}`);
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
