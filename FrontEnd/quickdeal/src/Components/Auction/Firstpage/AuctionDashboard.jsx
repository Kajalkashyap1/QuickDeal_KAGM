import React from "react";
import style from "./liveauction.module.css";
import panda from "../../Assets/panda1.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

const AuctionDashboard = () => {
    const { userid } = useParams();
    const navigate = useNavigate();
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

                <div className={`${style.auction_cards} ${style.div_main}`}>
                    {/* Assuming each card is represented by a component */}
                    <AuctionCard />
                </div>
            </div>
        </>
    );
};

function AuctionCard() {
    const navigate = useNavigate();
    return (
        <div
            className="cards"
            onClick={() => {
                navigate("/auction_main_page/product/661a8bb869f06bba04b1f9d2");
            }}>
            <img src={panda} alt="item.productname" className="proimage" />
            <div className="description-content">
                <div>
                    {/* &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  */}
                    <div className="price">₹ {"1000"}/-</div>
                    <div className="product_name">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Soluta, consectetur.
                    </div>
                </div>
                {/* Assuming you have a 'price' property in your item object */}
                <div className="Ad-title"></div>
                {/* Assuming you have an 'adTitle' property in your item object */}
                <div className="cardbottom">
                    <div className="cardlocation">
                        Lorem ipsum dolor sit amet consectetur."
                    </div>
                    <div className="date">27-12-2024</div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDashboard;
