import React, { useState } from "react";
import "./Products.css";
// import ImageUpload from "./image_files";
import Header from "../Header/Header";

const Products = () => {
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
            image: images,
        };

        // Do something with dataWithImages array
        console.log(dataWithImages);
    };

    return (
        <>
            <Header></Header>
            <div className="wrapper">
                <div className="title">POST YOUR AD</div>
                <div className="container">
                    <h3>INCLUDE THE DETAILS OF YOUR PRODUCT</h3>
                    (field contains * is required)
                    <form onSubmit={handleSubmit}>
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
                                mention the key features of your item(eg: brand
                                name, model, type)
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
        </>
    );
};

export default Products;
