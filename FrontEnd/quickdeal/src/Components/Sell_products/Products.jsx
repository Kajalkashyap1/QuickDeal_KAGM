import React, { useState, useEffect } from "react";
import "./Products.css";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";

const Products = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [userid, setuserid] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [isloading, setloading] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setuserid(false);
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
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
                <br />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                    Remove
                </button>
            </div>
        ));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Combine form data and images into an array
        const dataWithImages = {
            ...formData,
            images,
            userid: creatorDetails.userid,
            useremail: creatorDetails.useremail,
            username: creatorDetails.name,
        };
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
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
                setloading(false);
                setImages([]);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header></Header>
            {isloading ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}>
                    {/* <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        strokeColor="#4a4ad2"
                        strokeWidth="5"
                        animationDuration="1"
                        ariaLabel="rotating-lines-loading"
                    /> */}
                    <Hourglass
                        visible={true}
                        height="90"
                        width="60"
                        ariaLabel="hourglass-loading"
                        colors={["#306cce", "#72a1ed"]}
                    />
                    <br />
                    <i>
                        <h6>Posting Advertisement...</h6>
                    </i>
                </div>
            ) : (
                <div className="wrapper">
                    <div className="title">POST YOUR AD</div>
                    <div className="container">
                        <h3>INCLUDE THE DETAILS OF YOUR PRODUCT</h3>
                        (field contains * is required)
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data">
                            <div className="input_field">
                                Product Name: *
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span>example: mobile</span>
                            </div>

                            <div className="input_field">
                                Ad Title: *
                                <input
                                    type="text"
                                    name="adTitle"
                                    value={formData.adTitle}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span>
                                    mention the key features of your item(eg:
                                    brand name, model, type)
                                </span>
                            </div>

                            <div className="input_area">
                                Description: *
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span>
                                    include the condition, features, reason for
                                    selling
                                </span>
                            </div>

                            <div>
                                <h5>SET A PRICE (IN RUPEES) *</h5>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="photo">
                                <h5>UPLOAD PHOTOS (MAX-5) *</h5>
                                <div>
                                    {renderImages()}
                                    {images.length < 5 && (
                                        <div>
                                            <label htmlFor="addImage">
                                                Add Image:
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="addImage"
                                                onChange={(event) =>
                                                    handleImageChange(
                                                        images.length,
                                                        event
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="input_field">
                                Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Products;
