import React, { useState, useEffect, useRef } from "react";
import "./chatting.css";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { MessageBox } from "react-chat-elements";
import SendIcon from "@mui/icons-material/Send";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import tune from "../../audio/notification.mpeg";
import Navbar from "../Navbar/Navbar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const messageListReferance = React.createRef();
const ChattingLandingPage = () => {
    const navigate = useNavigate();
    let { buyer } = useParams();
    const [Activechats, setActivechats] = useState([]);
    const [clickedItems, setClickedItems] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [onlineusers, setonlineusers] = useState([]);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    navigate("/login");
                } else if (res.data.status === "success") {
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleItemClick = (index) => {
        // Reset previously clicked item
        if (clickedIndex !== null) {
            setClickedItems((prevClickedItems) => {
                const newClickedItems = [...prevClickedItems];
                newClickedItems[clickedIndex] = false;
                return newClickedItems;
            });
        }

        // Set the clicked item
        setClickedItems((prevClickedItems) => {
            const newClickedItems = [...prevClickedItems];
            newClickedItems[index] = true;
            return newClickedItems;
        });
        setClickedIndex(index);
    };

    axios.defaults.withCredentials = true;
    // --------------------- fetching active chats -----------------

    useEffect(() => {
        axios
            .get(`http://localhost:8000/chatting/getactivechat/${buyer}`)
            .then((res) => {
                setActivechats(res.data.data.members);
            })
            .catch((err) => {
                console.log("error while fetching active chats ", err.message);
            });
    }, []);
    // console.log("Active users -> ", Activechats);
    const showMessages = (sender, reciever) => {
        navigate(`/chat/${sender}/${reciever}`);
    };

    return (
        <>
            <Navbar searchbar={false} />
            <div className="maindiv">
                <div className="inbox">
                    <Card>
                        <Card.Body
                            className="inboxHeading p-2"
                            style={{ color: "white" }}>
                            INBOX
                        </Card.Body>
                    </Card>
                    <div className="activechat">
                        {Activechats.map(
                            (data, index) =>
                                data._id !== buyer && (
                                    <div
                                        className="chatitemcontainer"
                                        key={index}>
                                        <div
                                            className="card"
                                            onClick={() => {
                                                showMessages(buyer, data._id);
                                            }}>
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    handleItemClick(index)
                                                }
                                                className="card-body p-3"
                                                style={{
                                                    border: "1px solid rgb(5 23 29 / 34%)",
                                                    backgroundColor:
                                                        clickedItems[index]
                                                            ? "#ebeeef"
                                                            : "white",
                                                    padding: clickedItems[index]
                                                        ? ""
                                                        : "2px",
                                                    boxShadow: clickedItems[
                                                        index
                                                    ]
                                                        ? "rgba(0, 0, 0, 0.4) 2px 1px 5px 0px"
                                                        : "none", // Adding shadow effect
                                                    overflowY: "auto",
                                                    /* Hide scrollbar */
                                                    scrollbarWidth:
                                                        "none" /* Firefox */,
                                                    msOverflowStyle:
                                                        "none" /* IE/Edge */,
                                                    "&::-webkit-scrollbar": {
                                                        display:
                                                            "none" /* Chrome, Safari, Opera */,
                                                    },
                                                }}>
                                                <div className="d-flex align-items-center p-0 profileicon">
                                                    <img
                                                        src={data.imageurl}
                                                        className="rounded-circle mr-3"
                                                        width="40"
                                                        height="40"
                                                        alt={data.fullname}
                                                    />
                                                    <div className="chatuserinfo">
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                width: "100%",
                                                            }}>
                                                            <h5 className="mb-0">
                                                                {data.fullname}
                                                            </h5>
                                                            {/* ------- Online---------- */}
                                                            {onlineusers.some(
                                                                (user) =>
                                                                    user.userId ===
                                                                    data._id
                                                            ) && (
                                                                <p
                                                                    className="text-muted mb-0 fs-6"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}>
                                                                    <FiberManualRecordIcon
                                                                        fontSize="small"
                                                                        style={{
                                                                            fill: "green",
                                                                        }}
                                                                    />
                                                                    Online
                                                                </p>
                                                            )}
                                                            {/* ------- Offline---------- */}
                                                            {!onlineusers.some(
                                                                (user) =>
                                                                    user.userId ===
                                                                    data._id
                                                            ) && (
                                                                <p
                                                                    className="text-muted mb-0 fs-6"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}>
                                                                    <FiberManualRecordIcon
                                                                        fontSize="small"
                                                                        style={{
                                                                            fill: "red",
                                                                        }}
                                                                    />
                                                                    Offline
                                                                </p>
                                                            )}
                                                        </div>
                                                        <p
                                                            className="text-muted mb-0"
                                                            style={{
                                                                textTransform:
                                                                    "lowercase",
                                                            }}>
                                                            {data.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
                <div className="chatbox">
                    <Card.Body
                        className="messagehading p-1"
                        style={{
                            color: "black",
                            minHeight: "1.8em",
                        }}></Card.Body>
                    <div className="messagecontainer messagecontainer2">
                        Please select a Conversation first !
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChattingLandingPage;
