import React from "react";
import style from "../MyAds/Myads.module.css";
import panda from "../Assets/panda1.jpeg";
import "./card.css";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Auction.css";
import Cardcomponent from "./Cardcomponent";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { NavLink } from "react-bootstrap";
const AuctionDashboard = () => {
    const { userid } = useParams();

    return (
        <>
            <Navbar />
            <div className="auction-page">
                <NavLink
                    to = "/NewAuction"
                >
                    <button className="new-auction-btn">New Auction</button>
                </NavLink>
                
                <div className={style.header}>
                <div className={style.text}><h1>Live Auctions</h1></div>
                <div className={style.underline}></div>
            </div>
            
                
            <div className="auction-cards div-main">
        {/* Assuming each card is represented by a component */}
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </div>
    </div>
        </>
    );
};

function AuctionCard() {
    return (
        <div className="cards">
            <img
                src={panda}
                alt="item.productname"
                className="proimage"
            />
            <div className="description-content">
                <div>
                    {/* &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  */}
                    <div className="price">₹ {"1000"}/-</div>
                    <div className="product_name">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, consectetur.
                    </div>
                </div>
                {/* Assuming you have a 'price' property in your item object */}
                <div className="Ad-title">
                </div>
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
