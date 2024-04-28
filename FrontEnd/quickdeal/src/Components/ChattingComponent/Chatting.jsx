import React, { useState, useEffect, useRef } from "react";
import "./chatting.css";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { MessageBox } from "react-chat-elements";
import SendIcon from "@mui/icons-material/Send";
import Card from "react-bootstrap/Card";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import tune from "../../audio/notification.mpeg";
import Navbar from "../Navbar/Navbar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const messageListReferance = React.createRef();
let socket;
const Chatting = () => {
    useEffect(() => {
        socket = io.connect("http://localhost:8000/chat");
        return () => {
            socket.disconnect();
        };
    }, []);
    const navigate = useNavigate();
    let { buyer, seller } = useParams();
    const [mess, setmess] = useState("");
    const [messArray, setMessArray] = useState([]);
    const [buyerinfo, setbuyerinfo] = useState([]);
    const [sellerinfo, setsellerinfo] = useState([]);
    const [Activechats, setActivechats] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [clickedItems, setClickedItems] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [onlineusers, setonlineusers] = useState([]);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    // setauth(false);
                    navigate("/login");
                } else if (res.data.status === "success") {
                    // setauth(true);
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

    const messagehandel = (event) => {
        setmess(event.target.value);
    };

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get(`http://localhost:8000/profile/getuserinfo/${buyer}`)
            .then((res) => {
                setbuyerinfo(res.data.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://localhost:8000/profile/getuserinfo/${seller}`)
            .then((res) => {
                setsellerinfo(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [buyer, seller]);

    // console.log("seller info >>>> ", sellerinfo);
    // console.log("buyer info >>>> ", buyerinfo);
    useEffect(() => {
        socket?.emit("addUser", buyer);
        socket?.on("getUsers", (users) => {
            /// we can seee online users from here
            // console.log("activeUsers :>> ", users);
            setonlineusers(users);
        });
        const audio = new Audio(tune);

        socket?.on("getMessage", (data) => {
            // audio.play();
            // console.log("recieved ", data);
            setMessArray((prevMessages) => [
                ...prevMessages,
                {
                    sender: data.sender.email,
                    reciver: data.reciever?.email,
                    message: data.message,
                    date: data.date,
                },
            ]);
            axios
                .post("http://localhost:8000/chatting/storemessages", {
                    sender: buyer,
                    reciever: data.receiverId,
                    message: data.message,
                })
                .then((res) => {
                    // console.log("message saved successfully ! ");
                })
                .catch((error) => {
                    console.log(
                        "error while storing messages in chatting ",
                        error.message
                    );
                });
        });

        return () => {
            socket.off("getMessage");
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const sendMessage = () => {
        if (mess != "") {
            socket?.emit("sendMessage", {
                senderId: buyer,
                receiverId: seller,
                message: mess,
                date: new Date(),
            });
        }
        setmess("");
    };

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

    // --------------------- fetching chats -----------------
    useEffect(() => {
        var getmessages = () => {
            axios
                .get(
                    `http://localhost:8000/chatting/getmessages/${buyer}/${seller}`
                )
                .then((res) => {
                    setMessages(res.data.data);
                    // console.log("messages with users ->> ", res.data.data);
                    setMessArray([]);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        };
        getmessages();
    }, [buyer, seller]);
    const showMessages = (sender, reciever) => {
        navigate(`/chat/${sender}/${reciever}`);
    };
    // console.log("Active chats >>>> ", Activechats);

    useEffect(() => {
        // Scroll to the bottom of the message list when Messages state changes
        if (messageListReferance.current) {
            const messageContainer = messageListReferance.current;
            const lastMessage = messageContainer.lastChild;
            if (lastMessage) {
                lastMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        }
    }, [messArray, Messages]);
    return (
        <>
            <Navbar
                searchbar={false}
                message={messArray}
                sellerinfo={sellerinfo}
                buyerinfo={buyerinfo}
                message2={Messages}
            />
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
                                                                        textTransform:
                                                                            "lowercase",
                                                                    }}>
                                                                    <FiberManualRecordIcon
                                                                        fontSize="small"
                                                                        style={{
                                                                            fill: "green",
                                                                        }}
                                                                    />
                                                                    online
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
                                                                        textTransform:
                                                                            "lowercase",
                                                                    }}>
                                                                    <FiberManualRecordIcon
                                                                        fontSize="small"
                                                                        style={{
                                                                            fill: "red",
                                                                        }}
                                                                    />
                                                                    offline
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
                        style={{ color: "black" }}>
                        <img
                            src={sellerinfo[0]?.imageurl}
                            className="rounded-circle mr-3"
                            width="40"
                            height="40"
                            alt={sellerinfo[0]?.fullname}
                        />
                        {sellerinfo[0]?.fullname}
                    </Card.Body>
                    <div
                        className="messagecontainer"
                        ref={messageListReferance}>
                        <MessageList
                            className="message-list"
                            lockable={true}
                            toBottomHeight={"100%"}
                            dataSource={Messages.map((data, index) => ({
                                position:
                                    data.sender._id === buyer
                                        ? "right"
                                        : "left",
                                type: "text",
                                text: data.message,
                                date: data.time,
                                key: index, // Adding a unique key for each message
                            }))}
                        />

                        {messArray.map(
                            (data, index) =>
                                (data.sender === sellerinfo[0]?.email ||
                                    data.sender === buyerinfo[0]?.email) && (
                                    <div key={index}>
                                        <MessageBox
                                            position={
                                                data.sender ===
                                                buyerinfo[0].email
                                                    ? "right"
                                                    : "left"
                                            }
                                            type={"text"}
                                            text={data.message}
                                            date={data.date}
                                        />
                                    </div>
                                )
                        )}
                    </div>
                    <div messageinputdiv="true">
                        <input
                            type="text"
                            onChange={messagehandel}
                            value={mess}
                            placeholder="&emsp;&emsp;Type a message"
                            style={{
                                width: "calc(95% - 50px)",
                                height: "50px",
                                borderRadius: "10px",
                                border: "1px solid #4a4360d1",
                                margin: "10px",
                                color: "black",
                                backgroundColor: "rgba(255, 255, 255, 0.555)",
                            }}
                        />
                        <SendIcon
                            className="button"
                            onClick={sendMessage}
                            style={{ fontSize: "3em", marginLeft: "10px" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatting;
