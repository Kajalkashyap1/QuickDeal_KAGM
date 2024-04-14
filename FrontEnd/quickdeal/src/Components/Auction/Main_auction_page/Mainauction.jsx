import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import stylemain from "./mainauction.module.css";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CountdownTimer from "../../Timer/Countdown";
import { ToastContainer, toast } from "react-toastify";
import AlarmIcon from "@mui/icons-material/Alarm";
import EmailIcon from "@mui/icons-material/Email";
import CurrencyInput from "react-currency-input-field";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
let socket;
const Mainauction = () => {
    const { auctionid } = useParams();
    const [statechanged, setstatechanged] = useState(false);
    const [bid, setbid] = useState();
    const currentdate = new Date();
    useEffect(() => {
        socket = io.connect("http://localhost:8000/auction");
        return () => {
            socket.disconnect();
        };
    }, []);
    const [item, setitem] = useState([]);
    const [auctionended, setauctionended] = useState(true);
    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/auction/getCurrentAuctionbyid/${auctionid}`
            )
            .then((res) => {
                if (res.data.status == "success") {
                    setitem(res.data.liveAuctions);
                }
            })
            .catch((err) => {
                console.log(
                    "Error in fetching post in main auction page ",
                    err.message
                );
            });
    }, [statechanged]);
    const [isauth, setauth] = useState("");
    const [activename, setname] = useState("");
    const [activeuseremail, setuseremail] = useState("");
    const [activeimage, setimage] = useState("");
    const [activeuserid, setuserid] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                    // navigate("/login");
                } else if (res.data.status === "success") {
                    setauth(true);
                    setuserid(res.data.id);
                    setname(res.data.name);
                    setuseremail(res.data.email);
                    setimage(res.data.image);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setbid(item?.amountforauction);
    }, [item]);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };
    const formattedDate = formatDate(item?.productid?.date);
    const handleTerminateAuction = () => {
        toast.warning("Auction has been ended ! ", {
            position: "top-right",
            autoClose: 1800,
        });
        setauctionended(false);
    };
    // ------------------- delete auction --------------------
    const handleEndAuction = (auctionid) => {
        axios
            .post("http://localhost:8000/auction/endAuction", { auctionid })
            .then((res) => {
                if (res.data.status === "success") {
                    setstatechanged(!statechanged);
                }
            });
    };

    return (
        <>
            <Navbar />
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="dark"
            />
            <div className={stylemain.auctionheading}>
                <h4>Welcome to the Auction</h4>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                    }}>
                    {item.activetill && auctionended && (
                        <>
                            <AlarmIcon
                                fontSize="large"
                                style={{ fill: "#1679cb", marginRight: "10px" }}
                            />
                            Time remaining :&emsp;
                            <CountdownTimer
                                targetDate={item?.activetill}
                                onTimeUp={handleTerminateAuction}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={stylemain.maincontainer}>
                <div className={stylemain.firstcol}>
                    <div className={stylemain.leaderboard}>
                        <h3>Leaderboard</h3>
                        <div className={stylemain.horizontal}></div>
                        <div className={stylemain.leaderlist}>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                            <div className={stylemain.leadercards}>
                                <div className={stylemain.leadername}>
                                    <span>1.</span>
                                    <span> Gourav Karnor</span>{" "}
                                    <span> ₹ 1000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={stylemain.secondcol}>
                    <div className={stylemain.rightdiv}>
                        <div style={{ display: "flex" }}>
                            <div className={stylemain.image}>
                                <style>
                                    {`
                            .carousel-inner .carousel-item {
                                transition: transform 0.6s ease; /* Adjust transition duration */
                            }
                            `}
                                </style>

                                <Carousel>
                                    {item?.productid?.imageurl != undefined &&
                                        item?.productid?.imageurl?.map(
                                            (images, index) => (
                                                <Carousel.Item key={index}>
                                                    <img
                                                        src={images}
                                                        alt="item.productname"
                                                        style={{
                                                            width: "100%",
                                                            height: "290px",
                                                            objectFit:
                                                                "contain",
                                                            aspectRatio: 3 / 2,
                                                        }}
                                                    />
                                                </Carousel.Item>
                                            )
                                        )}
                                </Carousel>
                            </div>
                            <div className={stylemain.description}>
                                <h1>₹ {item?.amountforauction}</h1>
                                <h4>{item?.productid?.productname}</h4>
                                <p>👉 {item?.productid?.adtitle}</p>
                                <p>👉 {item?.productid?.description}</p>
                                <p>👉 {item?.productid?.location}</p>
                                <p>📅 {formattedDate}</p>
                            </div>
                        </div>
                        <div className={stylemain.sellerinformation}>
                            <h5>Owner info</h5>
                            <div className={stylemain.horizontal}></div>
                            <p style={{ textTransform: "capitalize" }}>
                                <AccountCircleIcon
                                    style={{ fill: "#0072ea" }}
                                />
                                &nbsp;
                                {item?.productid?.username}
                            </p>
                            <p>
                                <EmailIcon style={{ fill: "orangered" }} />
                                &nbsp;
                                {item?.productid?.useremail}
                            </p>
                        </div>
                    </div>
                    {item?.owner?._id != activeuserid &&
                        new Date(item?.activetill) > currentdate && (
                            <div className={stylemain.applyfont}>
                                <form>
                                    <div className={stylemain.makebid}>
                                        <h3>
                                            <CurrencyRupeeIcon
                                                fontSize="large"
                                                style={{
                                                    fill: "goldenrod",
                                                }}
                                            />
                                            Make an Offer :
                                        </h3>
                                        <CurrencyInput
                                            id="input-example"
                                            name="input-name"
                                            style={{
                                                fontSize: "35px",
                                                width: "40%",
                                                marginRight: "40px",
                                            }}
                                            placeholder="Please enter amount"
                                            value={bid}
                                            decimalsLimit={2}
                                            prefix="₹"
                                            onValueChange={(
                                                value,
                                                name,
                                                values
                                            ) => setbid(value)}
                                            required
                                        />
                                        <Button
                                            type="submit"
                                            // onClick={handleStartAuction}
                                            variant="outlined"
                                            startIcon={
                                                <SendIcon fontSize="large" />
                                            }
                                            style={{
                                                color: "purple", // Green color
                                                borderColor: "green", // Green color
                                                fontWeight: "600",
                                                fontSize: "large",
                                                border: "1px solid green",
                                                padding: "13px",
                                                borderRadius: "6px",
                                                marginLeft: "10px",
                                            }}>
                                            Send
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    {item?.owner?._id == activeuserid &&
                        new Date(item?.activetill) > currentdate && (
                            <Button
                                onClick={() => {
                                    handleEndAuction(item?._id);
                                }}
                                variant="outlined"
                                style={{
                                    color: "purple", // Green color
                                    borderColor: "green", // Green color
                                    fontWeight: "600",
                                    fontSize: "large",
                                    border: "1px solid green",
                                    padding: "13px",
                                    borderRadius: "6px",
                                    margin: "20px",
                                    float: "right",
                                }}>
                                End Auction
                            </Button>
                        )}
                    {new Date(item?.activetill) < currentdate && (
                        <center className="mt-4" style={{ color: "red" }}>
                            <h4>
                                -------------- Auction has been ended
                                --------------
                            </h4>
                        </center>
                    )}
                </div>
            </div>
        </>
    );
};

export default Mainauction;
