import React from "react";
import "./Products.css";
import ImageUpload from "./image_files";
import Header from "../Header/Header";

const Products = () => {
    return (
        <>
            <Header></Header>
            <div className="wrapper">
                <div className="title">POST YOUR AD</div>
                <div className="container">
                    <h3>INCLUDE THE DETAILS OF YOUR PRODUCT</h3>
                    (field contains * is required)
                    <form>
                        <div className="input_field">
                            Product Name: *<input type="text" required></input>
                            <span>example: mobile</span>
                        </div>

                        <div className="input_field">
                            Ad Title: *<input type="text" required></input>
                            <span>
                                mention the key features of your item(eg: brand
                                name, model, type)
                            </span>
                        </div>

                        <div className="input_area">
                            Description: *<input type="text" required></input>
                            <span>
                                include the condition, features, reason for
                                selling
                            </span>
                        </div>

                        <div>
                            <h5>SET A PRICE (IN RUPEES) *</h5>
                            <input type="number" required></input>
                        </div>

                        <div className="photo">
                            <h5>UPLOAD PHOTOS (MAX-5) *</h5>
                            <ImageUpload />
                        </div>

                        <div className="input_field">
                            Location:
                            <input type="text"></input>
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
