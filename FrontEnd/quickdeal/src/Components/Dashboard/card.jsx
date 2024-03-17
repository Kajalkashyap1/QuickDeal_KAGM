import React, { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";

const Card = () => {
    const [items, setitems] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/dashboard/getposts")
            .then((res) => {
                setitems(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="main">
            <h2>Filters will appear here</h2>
            <hr></hr>
            <div className="div-main">
                {/* card 1 */}
                {/* <div className="cards">
                    <img
                        className="card-img"
                        src="data:image/jpeg;base64,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"
                        alt="car"></img>
                    <div className="description-content">
                        <div className="price">8000</div>
                        <div className="Ad-title">
                            Maruti Suzuki swift 2015 petrol 36000 km driven
                        </div>
                    </div>
                </div> */}
                {items.map((item, index) => (
                    <div className="cards" key={index}>
                        <img
                            className="card-img"
                            src={item.imageurl[0]} // Assuming you have an 'image' property in your item object
                            alt={item.productName} // Assuming you have a 'productName' property in your item object
                        />
                        <div className="description-content">
                            <div className="price">
                                {item.productname}
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                ₹ {item.price}/-
                            </div>
                            {/* Assuming you have a 'price' property in your item object */}
                            <div className="Ad-title">{item.adtitle}</div>
                            {/* Assuming you have an 'adTitle' property in your item object */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
