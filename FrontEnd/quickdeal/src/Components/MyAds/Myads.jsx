import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Myads.module.css";
import Navbar from "../Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useConfirm } from "material-ui-confirm";
import { ToastContainer, toast } from "react-toastify";
import Notfound from "../NotfoundComponent/Notfound";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const Myads = () => {
    const navigate = useNavigate();
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

    // --------------------- Handle delete confirmation-------------
    const confirm = useConfirm();

    const handleClick = () => {
        confirm({ description: "This action is permanent!" })
            .then(() => {
                /* ... */
            })
            .catch(() => {
                /* ... */
            });
    };

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
                    toast.success("Post updated Successfully", {
                        autoClose: 1000,
                        position: "top-right",
                    });
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
        confirm({
            description: "Mark the item as sold and deactivate your ad ?",
        })
            .then(() => {
                /* ... */
                axios
                    .post(
                        `http://localhost:8000/dashboard/markAsSold/${postid}`
                    )
                    .then((res) => {
                        if (res.data.status === "success") {
                            toast.success("Marked as Sold", {
                                autoClose: 1000,
                                position: "top-right",
                            });
                            setchangeUi(!changeui);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch(() => {
                /* ... */
                toast.error("Action cancelled", {
                    position: "top-right",
                    autoClose: 1000,
                });
            });
    };
    // --------------------- mark as unsold -----------------------
    const handleMarkasunSold = (postid) => {
        confirm({
            description: "Mark the item as unsold and activate your ad again?",
        })
            .then(() => {
                /* ... */
                axios
                    .post(
                        `http://localhost:8000/dashboard/markAsSold/${postid}`
                    )
                    .then((res) => {
                        if (res.data.status === "success") {
                            toast.success("Marked as unsold", {
                                autoClose: 1000,
                                position: "top-right",
                            });
                            setchangeUi(!changeui);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch(() => {
                /* ... */
                toast.error("Action cancelled", {
                    position: "top-right",
                    autoClose: 1000,
                });
            });
    };

    // ---------------handle Delete Post --------------
    const handleDeletePost = (postid) => {
        confirm({
            description: "Delete this post? This action is irreversible",
        })
            .then(() => {
                /* ... */
                axios
                    .post(
                        `http://localhost:8000/dashboard/DeletePost/${postid}`
                    )
                    .then((res) => {
                        if (res.data.status === "success") {
                            toast.success("Post Deleted Successfully !", {
                                position: "top-right",
                                autoClose: 1000,
                            });
                            setchangeUi(!changeui);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch(() => {
                /* ... */
                toast.error("Action cancelled", {
                    position: "top-right",
                    autoClose: 1000,
                });
            });
    };

    return (
        <div className={style.main}>
            <Navbar searchbar={false} />
            {/* --------------------- Toast container ---------------- */}
            <ToastContainer
                position="top-right"
                autoClose={1000}
                theme="dark"
            />
            {/* --------------------- Toast container ---------------- */}
            <div className={style.header}>
                <div className={style.text}>MyAds</div>
                <div className={style.underline}></div>
            </div>
            {ads?.length ? (
                ads.map((item, index) => (
                    <div className={style.cards} key={index}>
                        <div className={style.card}>
                            {/* image of the product posted by user  */}
                            <div className={style.product_img}>
                                <img src={item.imageurl[0]}></img>
                            </div>
                            {/* all the details of the product */}
                            <div className={style.product_content}>
                                {/* product price */}
                                <div className={style.productleftcontent}>
                                    <div className={style.product_price}>
                                        <b>&emsp;👉&emsp;Price:</b>₹{" "}
                                        {item.price}
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
                                </div>
                                {/* card bottom starts */}
                                <div className={style.card_right}>
                                    {/* like icon and availablity icon */}
                                    <div className={style.imp_icons}>
                                        <div className={style.likes}>
                                            <FavoriteIcon
                                                fontSize="medium"
                                                className={style.Icon}
                                            />
                                            &ensp;
                                            <span style={{ fontSize: "large" }}>
                                                Likes : {item.likedby?.length}
                                            </span>
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
                                        <>
                                            {" "}
                                            <Tooltip title="View ad" arrow>
                                                <IconButton
                                                    onClick={() => {
                                                        navigate(
                                                            `/myads/preview/${
                                                                item._id
                                                            }/${true}`
                                                        );
                                                    }}>
                                                    <RemoveRedEyeIcon fontSize="medium" />
                                                    &nbsp;Preview
                                                </IconButton>
                                            </Tooltip>
                                            {/* -------------- Mark as Sold button  start------------- */}
                                            {!item.hasSold ? (
                                                <Tooltip
                                                    className={style.btn}
                                                    onClick={() => {
                                                        handleMarkasSold(
                                                            item._id
                                                        );
                                                    }}
                                                    title="Mark as Sold"
                                                    arrow>
                                                    <IconButton>
                                                        {/* <DoneOutlineIcon
                                                        fontSize="medium"
                                                        style={{
                                                            fill: "green",
                                                        }}
                                                    /> */}
                                                        Mark Sold
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip
                                                    className={style.btn}
                                                    onClick={() => {
                                                        handleMarkasunSold(
                                                            item._id
                                                        );
                                                    }}
                                                    title="Mark as unsold"
                                                    arrow>
                                                    <IconButton>
                                                        {/* <CloseIcon
                                                        fontSize="medium"
                                                        style={{
                                                            fill: "green",
                                                        }}
                                                    /> */}
                                                        Unmark sold
                                                    </IconButton>
                                                </Tooltip>
                                            )}
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
                            {/* ------------------------ Edit form starts -------------------- */}
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
                                                    defaultValue={
                                                        item.productname
                                                    }
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
                                                    defaultValue={
                                                        item.description
                                                    }
                                                    style={{
                                                        height: "50px",
                                                    }}></textarea>
                                            </div>
                                        </div>
                                        <div className={style.btn}>
                                            <button
                                                className={style.submit_btn}
                                                type="submit">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <Notfound
                    title="No posts Found"
                    subtitle="It seems like you haven't posted anything yet."
                    name="myad"
                />
            )}
        </div>
    );
};

export default Myads;
