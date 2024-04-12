import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const AuctionDashboard = () => {
    const { userid } = useParams();

    return (
        <>
            <Navbar />
            <p>Make a button for creation of Auction</p>
            <p>Live auction</p>
            <div>live auction cards</div>
            <div>live auction cards</div>
        </>
    );
};

export default AuctionDashboard;
