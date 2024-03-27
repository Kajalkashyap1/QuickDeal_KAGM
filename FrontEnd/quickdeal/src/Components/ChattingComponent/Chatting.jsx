import React, { useState, useEffect, useRef } from "react";
import "./chatting.css";
import "react-chat-elements/dist/main.css";
import Header from "../Header/Header";
import { MessageList } from "react-chat-elements";
import { MessageBox } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import Card from "react-bootstrap/Card";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import tune from "../../audio/notification.mpeg";
const socket = io.connect("http://localhost:8000");
const messageListReferance = React.createRef();

const Chatting = () => {
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
                console.log(res.data);
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
    }, []);

    // console.log("seller info >>>> ", sellerinfo);
    // console.log("buyer info >>>> ", buyerinfo);
    useEffect(() => {
        socket?.emit("addUser", buyer);
        socket?.on("getUsers", (users) => {
            console.log("activeUsers :>> ", users);
        });
        const audio = new Audio(tune);

        socket?.on("getMessage", (data) => {
            // audio.play();
            console.log("recieved ", data);
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
                    console.log("message saved successfully ! ");
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
        socket?.emit("sendMessage", {
            senderId: buyer,
            receiverId: seller,
            message: mess,
            date: new Date(),
        });
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
            <Header />
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
                                                    overflow: "auto",
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
                                                        <h5 className="mb-0">
                                                            {data.fullname}
                                                        </h5>
                                                        <p className="text-muted mb-0">
                                                            {data.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <ChatItem
                                            avatar={data.imageurl}
                                            alt={"Reactjs"}
                                            title={data.fullname}
                                            subtitle={data.email}
                                            unread={5}
                                            onClick={() => {
                                                showMessages(buyer, data._id);
                                            }}
                                            statusColor={"green"}
                                            statusColorType={"encircle"}
                                            lazyLoadingImage={
                                                "https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"
                                            }
                                        /> */}
                                    </div>
                                )
                        )}
                    </div>
                </div>
                <div className="chatbox">
                    <div
                        className="messagecontainer"
                        ref={messageListReferance}>
                        {/* <p>From : {data.sender.fullname}</p>
                            <h4>Message : {data.message}</h4> */}
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
                    <input
                        type="text"
                        onChange={messagehandel}
                        value={mess}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    );
};

export default Chatting;
