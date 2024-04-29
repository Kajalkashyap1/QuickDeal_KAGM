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
    const [messArray, setMessArray] = useState([]);
    const [item, setitem] = useState([]);
    const [auctionended, setauctionended] = useState(true);
    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/auction/getCurrentAuctionbyid/${auctionid}`
            )
            .then((res) => {
                if (res.data.status === "success") {
                    setitem(res.data.liveAuctions);
                }
            })
            .catch((err) => {
                console.log(
                    "Error in fetching post in main auction page ",
                    err.message
                );
            });
    }, [statechanged, auctionid]);

    const [activename, setname] = useState("");
    const [activeuseremail, setuseremail] = useState("");
    const [activeuserid, setuserid] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    // navigate("/login");
                } else if (res.data.status === "success") {
                    setuserid(res.data.id);
                    setname(res.data.name);
                    setuseremail(res.data.email);
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

    const [activeusersinAuction, setactiveusersinAuction] = useState([]);
    const [demo, setdemo] = useState([]);
    // ---------------- socket for auction --------------------

    useEffect(() => {
        socket = io.connect("http://localhost:8000/auction");
        return () => {
            socket.disconnect();
        };
    }, [auctionid]);

    useEffect(() => {
        if (activename !== "") {
            socket.emit("joinAuctionRoom", {
                activeUserId: activeuserid,
                auctionId: auctionid,
                username: activename,
                useremail: activeuseremail,
            });
        }
    }, [activeuserid, auctionid, activename, activeuseremail]);

    useEffect(() => {
        const handleUpdateUsersInAuction = (message) => {
            if (message.username !== "" && message.added === true) {
                toast.info(`${message.username} Joined Auction`, {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
            if (message.username !== "" && message.added === false) {
                toast.info(`${message.username} Left the Auction`, {
                    position: "top-right",
                    autoClose: 1000,
                });
            }

            setactiveusersinAuction(message.users);
        };

        const handleMessage = (message) => {
            setMessArray((prevMessages) => {
                const newMessages = [
                    ...prevMessages,
                    {
                        senderid: message.senderId,
                        offer: message.message,
                        sendername: message.sendername,
                    },
                ];
                // Sort the messages array by the 'offer' property in descending order
                newMessages.sort((a, b) => b.offer - a.offer);

                // Return the sorted array
                return newMessages;
            });
            axios
                .post(
                    `http://localhost:8000/auction/setBitAmount/${auctionid}`,
                    message
                )
                .then((res) => {
                    if (res.data.status === "success") {
                    }
                })
                .catch((err) => {
                    console.log("Error in Bid saving ", err.message);
                });
        };

        socket.on("updateUsersInAuction", handleUpdateUsersInAuction);
        socket.on("message", handleMessage);

        return () => {
            socket.off("updateUsersInAuction", handleUpdateUsersInAuction);
            socket.off("message", handleMessage);
        };
    }, [auctionid, activename, activeuserid]);

    const [pastBids, setpastbids] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/auction/getBitAmounts/${auctionid}`)
            .then((res) => {
                if (res.data.status === "success") {
                    setpastbids(res.data.liveAuctions);
                }
            })
            .catch((err) => {
                console.log("error in get past auction bids ", err.message);
            });
    }, [auctionid]);
    // console.log(auctionResult);

    const handleSendOffer = (e) => {
        e.preventDefault();
        const auctionid = item._id;
        if (bid !== 0) {
            socket?.emit("sendMessage", auctionid, {
                senderId: activeuserid,
                sendername: activename,
                message: bid,
                date: new Date(),
            });
        }
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

    useEffect(() => {
        setdemo(activeusersinAuction);
    }, [activeusersinAuction]);
    // const [membersInAuction, setmembersInAuction] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get(
    //             `http://localhost:8000/auction/getMemberInAuction/${auctionid}`
    //         )
    //         .then((res) => {
    //             setmembersInAuction(res.data.info);
    //         })
    //         .catch((err) => {
    //             console.log(
    //                 "error in fetching active members in auction",
    //                 err.message
    //             );
    //         });
    // }, []);
    const uniqueItems = new Set();
    const uniquePastBids = pastBids.filter((item) => {
        const key = `${item.senderId.fullname}-${item.amount}`;
        if (!uniqueItems.has(key)) {
            uniqueItems.add(key);
            return true;
        }
        return false;
    });
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
                <div className={`${stylemain.firstcol} ${stylemain.widthhigh}`}>
                    <div className={stylemain.leaderboard}>
                        <h3>Leaderboard</h3>
                        <div className={stylemain.horizontal}></div>
                        <div className={`${stylemain.leaderlist} `}>
                            {messArray.length !== 0 && (
                                <center
                                    style={{
                                        fontSize: "large",
                                        color: "orangered",
                                    }}>
                                    <hr />
                                    <strong>
                                        <p>Live Offers</p>
                                    </strong>
                                    <hr />
                                </center>
                            )}
                            {messArray.length === 0 &&
                                uniquePastBids.length === 0 && (
                                    <center
                                        style={{
                                            fontSize: "large",
                                            color: "orangered",
                                        }}>
                                        <hr />
                                        <strong>
                                            <p>No offers till now ! </p>
                                        </strong>
                                        <hr />
                                    </center>
                                )}
                            {messArray?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={stylemain.leadercards}>
                                        <div className={stylemain.leadername}>
                                            <span> {item.sendername}</span>
                                            <span> ₹ {item.offer}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            {uniquePastBids && (
                                <center
                                    style={{
                                        fontSize: "large",
                                        color: "orangered",
                                    }}>
                                    <hr />
                                    <strong></strong>
                                    <hr />
                                </center>
                            )}
                            {uniquePastBids?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={stylemain.leadercards}>
                                        <div className={stylemain.leadername}>
                                            <span>
                                                {item.senderId.fullname}
                                            </span>
                                            <span> ₹ {item.amount}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={stylemain.firstcol}>
                    <div className={stylemain.leaderboard}>
                        <h3>Online Users</h3>
                        <div className={stylemain.horizontal}></div>
                        <div className={stylemain.leaderlist}>
                            {demo?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={stylemain.leadercards}>
                                        <div className={stylemain.leadername}>
                                            <span> {item.name}</span>{" "}
                                        </div>
                                    </div>
                                );
                            })}
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
                                    {item?.productid?.imageurl !== undefined &&
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
                    {item?.owner?._id !== activeuserid &&
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
                                            onClick={handleSendOffer}
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
                    {item?.owner?._id === activeuserid &&
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
