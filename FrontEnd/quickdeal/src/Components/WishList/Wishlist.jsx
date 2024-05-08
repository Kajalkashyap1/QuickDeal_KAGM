import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Notfound from "../NotfoundComponent/Notfound";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./wishlist.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Oval } from "react-loader-spinner";
const Wishlist = () => {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [likedPosts, setlikedPosts] = useState([]);
    const [deleted, setdeleted] = useState(false);
    const [loading, setloading] = useState(false);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        setloading(true);
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
        setloading(false);
    }, []);

    useEffect(() => {
        setloading(true);
        axios
            .get(`http://localhost:8000/dashboard/getLikedPosts/${userid}`)
            .then((res) => {
                setlikedPosts(res.data.post);
            })
            .catch((error) => {
                console.log(error);
            });
        setloading(false);
    }, [deleted]);

    // -------------- delete wishlist item -------------

    const handleWishDelete = (id) => {
        setloading(true);
        axios
            .post(
                `http://localhost:8000/dashboard/updatePostLikes/${id}/${userid}`
            )
            .then((res) => {
                if (res.data.status === "success") {
                    setdeleted(!deleted);
                }
            })
            .catch((err) => {
                console.log("error in updating likes ", err.message);
            });
        setloading(false);
    };

    // ------------- handle check out ------------

    const handlecheckout = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            {loading ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="purple"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <br />
                    <i>loading..</i>
                </div>
            ) : (
                <>
                    <Navbar searchbar={false} />
                    <div className="wishlistContainer formargin">
                        {/* <center className="wishlistmainheading">
                    <FavoriteBorderIcon
                        className="hearticon"
                        sx={{ fontSize: 60 }}
                    />
                    <h2>My Wishlist</h2>
                </center> */}
                        <div className="header">
                            <div className="text"> Wishlist</div>
                            <div className="underline"></div>
                        </div>
                        <div className="listcontainer">
                            {likedPosts.length ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Current status</th>
                                            <th>Checkout</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {likedPosts.map((item, index) => (
                                            <tr
                                                className="postitems"
                                                key={index}>
                                                <td>
                                                    <div
                                                        className="imageanddelete"
                                                        onClick={() => {
                                                            handleWishDelete(
                                                                item._id
                                                            );
                                                        }}>
                                                        <Tooltip
                                                            title="Remove "
                                                            arrow>
                                                            <IconButton>
                                                                <DeleteOutlinedIcon
                                                                    fontSize="large"
                                                                    className="deletebutton"
                                                                />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <img
                                                            src={
                                                                item.imageurl[0]
                                                            }
                                                            alt="Not Found"
                                                            height={"80rem"}
                                                            width={"80rem"}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>
                                                        {item.productname}
                                                    </span>
                                                </td>
                                                <td>{item.adtitle}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    {item.hasSold ? (
                                                        <img
                                                            src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711726840/sold_1_soa3b5.png"
                                                            alt=""
                                                            height="50em"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711726381/available_mbj74i.png"
                                                            alt=""
                                                            height="50em"
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    {!item.hasSold ? (
                                                        <Tooltip
                                                            title="Checkout"
                                                            arrow
                                                            onClick={() => {
                                                                handlecheckout(
                                                                    item._id
                                                                );
                                                            }}>
                                                            <IconButton>
                                                                <ShoppingCartOutlinedIcon
                                                                    fontSize="large"
                                                                    className="checkoutbutton"
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip
                                                            title="Checkout"
                                                            arrow
                                                            style={{
                                                                pointerEvents:
                                                                    "none",
                                                            }}>
                                                            <IconButton>
                                                                <ShoppingCartOutlinedIcon
                                                                    fontSize="large"
                                                                    className="checkoutbutton"
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            ) : (
                                <Notfound
                                    title="No posts Found"
                                    subtitle="It seems like you haven't liked any post."
                                    name="wishlist"
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Wishlist;
