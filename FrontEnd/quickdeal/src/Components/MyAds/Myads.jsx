import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Myads.module.css";
import Header from "../Header/Header";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
const Myads = () => {
    // ----- edit form show------
    const [showeditField, setShoweditField] = useState({});

    const { userid } = useParams();
    const [ads, setads] = useState([]);
    const [changeui, setchangeUi] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/myads/${userid}`)
            .then((res) => {
                setads(res.data.result);
            })
            .catch((err) => {
                console.log("error in fetching my ads ", err);
            });
    }, [changeui, userid]);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };

    // ---------------handle Edit Post --------------

    const handleSubmit = async (e, item) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        axios
            .post(
                `http://localhost:8000/dashboard/updatePost/${item._id}`,
                data
            )
            .then((res) => {
                if (res.data.status === "success") {
                    setShoweditField(false);
                    setchangeUi(!changeui);
                }
            })
            .catch((err) => {
                console.log("Error in update post client ", err.message);
            });
    };

    // --------------- handle Mark as Sold --------------

    const handleMarkasSold = (postid) => {
        axios
            .post(`http://localhost:8000/dashboard/markAsSold/${postid}`)
            .then((res) => {
                if (res.data.status === "success") {
                    setchangeUi(!changeui);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    // ---------------handle Delete Post --------------
    const handleDeletePost = (postid) => {
        axios
            .post(`http://localhost:8000/dashboard/DeletePost/${postid}`)
            .then((res) => {
                if (res.data.status === "success") {
                    setchangeUi(!changeui);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div className={style.main}>
            <Header></Header>

            <div className={style.header}>
                <div className={style.text}>MyAds</div>
                <div className={style.underline}></div>
            </div>
            {ads.map((item, index) => (
                <div className={style.cards} key={index}>
                    <div className={style.card}>
                        {/* image of the product posted by user  */}
                        <div className={style.product_img}>
                            <img src={item.imageurl[0]}></img>
                        </div>
                        {/* all the details of the product */}
                        <div className={style.product_content}>
                            {/* product price */}
                            <div className={style.product_price}>
                                <b>&emsp;👉&emsp;Price:</b>₹ {item.price}
                            </div>
                            {/* products name */}
                            <div className={style.product_name}>
                                <b>&emsp;👉&emsp;Product Name:</b>{" "}
                                {item.productname}
                            </div>
                            {/* product title */}
                            <div className={style.product_title}>
                                <b>&emsp;👉&emsp;Product Title:</b>{" "}
                                {item.adtitle}
                            </div>
                            {/* product description */}
                            <div className={style.product_description}>
                                <b>&emsp;👉&emsp;Description:</b>{" "}
                                {item.description}
                            </div>
                            {/* product published date */}
                            <div className={style.publish_date}>
                                <b>&emsp;👉&emsp;Published on:</b> 📅
                                {formatDate(item.date)}
                            </div>

                            {/* card bottom starts */}
                            <div className={style.card_bottom}>
                            
                            {/* like icon and availablity icon */}
                            <div className={style.imp_icons}>
                                        

                                            <div className={style.likes}>
                                                <FavoriteIcon
                                                    fontSize="large"
                                                    className={style.Icon}
                                                />
                                                
                                                <div>{item.likedby?.length}</div>
                                            </div>

                                            {/* available or sold */}
                                        <div className={style.available_icon}>
                                            {item.hasSold ? (
                                                    <img
                                                        src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711726840/sold_1_soa3b5.png"
                                                        alt=""
                                                        height="50em"
                                                        className={style.Icon}
                                                    />
                                                ) : (
                                                    <img
                                                        src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711726381/available_mbj74i.png"
                                                        alt=""
                                                        height="50em"
                                                        className={style.Icon}
                                                    />
                                                )}
                                        </div>
                                       

                             </div>
                             {/* like icon and availablity icon end */}
                                    
                            {/* all button starts */}
                                {/* all the important links */}
                                <div className={style.imp_btns}>
                                    {!item.hasSold && (
                                        <>
                                            {/* -------------- Mark as Sold button  start------------- */}

                                            <Tooltip
                                                className={style.btn}
                                                onClick={() => {
                                                    handleMarkasSold(item._id);
                                                }}
                                                title="Mark as Sold"
                                                arrow>
                                                <IconButton>
                                                    <DoneOutlineIcon
                                                        fontSize="medium"
                                                        style={{
                                                            fill: "green",
                                                        }}
                                                    />
                                                    Sold
                                                </IconButton>
                                            </Tooltip>
                                            {/* -------------- Mark as Sold button end ------------- */}

                                            {/* ---------------------- Edit Button ----------------- */}
                                            <Tooltip
                                                className={style.btn}
                                                title="Edit Post"
                                                arrow
                                                onClick={() =>
                                                    setShoweditField(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            [item._id]:
                                                                !prevState[
                                                                    item._id
                                                                ],
                                                        })
                                                    )
                                                }>
                                                <IconButton>
                                                    <EditIcon
                                                        fontSize="medium"
                                                        style={{
                                                            fill: "#2627a9cf",
                                                        }}
                                                    />
                                                    Edit
                                                </IconButton>
                                            </Tooltip>
                                            {/* ---------------------- Edit Button ----------------- */}
                                        </>
                                    )}
                                    <Tooltip
                                        title="Delete Post"
                                        arrow
                                        onClick={() => {
                                            handleDeletePost(item._id);
                                        }}>
                                        <IconButton>
                                            <DeleteIcon
                                                fontSize="medium"
                                                style={{ fill: "red" }}
                                            />
                                            Delete
                                        </IconButton>
                                    </Tooltip>
                                </div>
                           
                            {/* all button ends */}
                        </div>
                           {/* card bottom end */}
                        </div>
                        <br />
                        <br />
                        {showeditField[item._id] && (
                            <div className="editfield">
                                <hr />
                                <center>
                                    <h2> Edit Post</h2>
                                </center>
                                <form
                                    className="editForm"
                                    onSubmit={(e) => handleSubmit(e, item)}>
                                    <div className="row mt-4 mb-4">
                                        <div className="col">
                                            <label
                                                htmlFor="productname"
                                                className="form-label">
                                                <b>Product Name:</b>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="productname"
                                                id="productname"
                                                placeholder="Product Name"
                                                defaultValue={item.productname}
                                            />
                                        </div>
                                        <div className="col">
                                            <label
                                                htmlFor="adtitle"
                                                className="form-label">
                                                <b>Ad Title:</b>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Ad Title"
                                                name="adtitle"
                                                id="adtitle"
                                                defaultValue={item.adtitle}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4 mb-4">
                                        <div className="col">
                                            <label
                                                htmlFor="price"
                                                className="form-label">
                                                <b>Price:</b>
                                            </label>
                                            <input
                                                type="Number"
                                                className="form-control"
                                                name="price"
                                                id="price"
                                                placeholder="Price"
                                                defaultValue={item.price}
                                            />
                                        </div>
                                        <div className="col">
                                            <label
                                                htmlFor="location"
                                                className="form-label">
                                                <b>Location:</b>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Location"
                                                name="location"
                                                id="location"
                                                defaultValue={item.location}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4 mb-4">
                                        <div className="col">
                                            <label
                                                htmlFor="floatingTextarea2"
                                                className="form-label">
                                                <b>Description:</b>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Description"
                                                name="description"
                                                id="floatingTextarea2"
                                                defaultValue={item.description}
                                                style={{
                                                    height: "50px",
                                                }}></textarea>
                                        </div>
                                    </div>
                                    <div className={style.btn}>
                                    <button className={style.submit_btn} type="submit" >Update</button>
                                    </div>
                                    
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Myads;
