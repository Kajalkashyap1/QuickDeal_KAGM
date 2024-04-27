import React, { useState, useEffect } from "react";
import style from "./Products.module.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { categoriesForForm } from "../Assets/categories";

const Products = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [userid, setuserid] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [isloading, setloading] = useState(false);

    // State to hold selected values
    const [selectedValues, setSelectedValues] = useState([]);

    // Event handler for checkbox change
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            // If checkbox is checked, add value to selected values array
            setSelectedValues([...selectedValues, value]);
        } else {
            // If checkbox is unchecked, remove value from selected values array
            setSelectedValues(selectedValues.filter((val) => val !== value));
        }
    };
    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setuserid(false);
                    navigate("/login");
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
    const creatorDetails = { userid, name, useremail };
    const [formData, setFormData] = useState({
        productName: "",
        adTitle: "",
        description: "",
        price: "",
        location: "",
    });

    const [images, setImages] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    // Declaring the category list

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const renderImages = () => {
        return images.map((image, index) => (
            <div
                key={index}
                style={{ display: "inline-block", marginRight: "10px" }}>
                <img
                    src={URL.createObjectURL(image)}
                    alt={`${index + 1}`}
                    style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        marginTop: "2rem",
                    }}
                />
                <br />
                <Tooltip title="Remove " arrow>
                    <IconButton onClick={() => handleRemoveImage(index)}>
                        <DeleteIcon
                            fontSize="medium"
                            className="deletebutton"
                        />
                    </IconButton>
                    <span style={{ fontSize: "small" }}>Remove</span>
                </Tooltip>
            </div>
        ));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedValues.length === 0) {
            toast.warning("Please select atleast one category !", {
                position: "top-right",
                autoClose: 3500,
            });
            return;
        }
        // Combine form data and images into an array
        const dataWithImages = {
            ...formData,
            category: selectedValues,
            images,
            userid: creatorDetails.userid,
            useremail: creatorDetails.useremail,
            username: creatorDetails.name,
        };
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        console.log(dataWithImages);
        setloading(true);
        axios
            .post(
                "http://localhost:8000/dashboard/uploadimage",
                dataWithImages,
                config
            )
            .then((res) => {
                setFormData({
                    productName: "",
                    adTitle: "",
                    description: "",
                    price: "",
                    location: "",
                });
                // setloading(false);
                setImages([]);
                toast.success("Post created !", {
                    position: "top-center",
                    autoClose: 1500,
                });
                setTimeout(() => {
                    navigate(`/myads/${userid}`);
                }, 1600);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Navbar searchbar={false} />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                theme="dark"
            />
            {isloading ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}>
                    <Hourglass
                        visible={true}
                        height="90"
                        width="60"
                        ariaLabel="hourglass-loading"
                        colors={["#306cce", "#72a1ed"]}
                    />
                    <br />
                    <i>
                        <h6>Posting Advertisement ! Don't close the page...</h6>
                    </i>
                </div>
            ) : (
                <div className={style.wrapper}>
                    <div className={style.header}>
                        <div className={style.title}>POST YOUR AD</div>
                        <div className={style.underline}></div>
                    </div>

                    <div className={style.container}>
                        <div className={style.formheading}>
                            <h4>INCLUDE THE DETAILS OF YOUR PRODUCT</h4>
                            <span className={style.requiredwarning}>
                                field contains * are required
                            </span>
                        </div>
                        <hr
                            style={{
                                color: "black",
                                borderTop: "2px solid black",
                            }}
                        />
                        <div className={style.formcontainer}>
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data">
                                <div className={style.input_field}>
                                    <b>Product Name: *</b>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <span>example: mobile</span>
                                </div>

                                <div className={style.input_field}>
                                    <b>Ad Title: *</b>
                                    <input
                                        type="text"
                                        name="adTitle"
                                        value={formData.adTitle}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span>
                                        mention the key features of your
                                        item(eg: brand name, model, type)
                                    </span>
                                </div>
                                {/* Adding the category field here */}
                                <div className={style.select_field}>
                                    <b>Category: *</b>
                                    <br />
                                    <span>
                                        Please select the categories that best
                                        describe the product you're advertising.
                                    </span>
                                    <div
                                        className={style.select_field_checkbox}>
                                        {categoriesForForm.map((option) => (
                                            <div
                                                key={option.value}
                                                className={style.checkfield}>
                                                <input
                                                    type="checkbox"
                                                    id={option.value}
                                                    value={option.value}
                                                    checked={selectedValues.includes(
                                                        option.value
                                                    )}
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                />
                                                <label
                                                    htmlFor={option.value}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}>
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={style.input_field_area}>
                                    <b>Description: *</b>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <span>
                                        include the condition, features, reason
                                        for selling
                                    </span>
                                </div>

                                <div className={style.input_field}>
                                    <b style={{ color: "black" }}>Location *</b>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <hr />
                                <div className={style.input_number}>
                                    <b style={{ color: "black" }}>
                                        Set a price (in Rupees) *
                                    </b>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <hr />
                                <div className={style.photo}>
                                    <b
                                        style={{
                                            color: "black",
                                        }}>
                                        Upload Photos (Max-5 ) *
                                    </b>
                                    <div>
                                        {renderImages()}
                                        {images.length < 5 && (
                                            <div>
                                                <Tooltip
                                                    title="Upload Image "
                                                    arrow>
                                                    <label
                                                        htmlFor="addImage"
                                                        className={
                                                            style.imageinputlable
                                                        }>
                                                        <UploadIcon
                                                            fontSize="large"
                                                            style={{
                                                                color: "#272777",
                                                            }}
                                                        />
                                                        Upload image
                                                    </label>
                                                </Tooltip>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="addImage"
                                                    required
                                                    onChange={(event) =>
                                                        handleImageChange(
                                                            images.length,
                                                            event
                                                        )
                                                    }
                                                    style={{
                                                        display: "none", // Hide the default input
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={style.btn}>
                                    <button
                                        type="submit"
                                        className={style.submit_btn}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Products;
