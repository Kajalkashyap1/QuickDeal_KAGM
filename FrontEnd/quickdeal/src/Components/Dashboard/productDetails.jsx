import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    // let id = match.params.id;
    const { id } = useParams();
    const [item, setitem] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/post/${id}`)
            .then((res) => {
                setitem(res.data.info);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    console.log(item);
    return (
        <>
            <h1>Product Details of : </h1>
            <p>Adtitle : {item.adtitle}</p>
            <p> Product Name : {item.productname}</p>
            <p>Descfiption : {item.description}</p>
            <p>Price: {item.price}</p>
            <p>Location: {item.location}</p>
            <p>Ad published on : {item.date}</p>
            <hr />
            <hr />

            <h1>Seller details</h1>
            <p>name : {item.username}</p>
            <p>email : {item.useremail}</p>
            <p>_id : {item.userid}</p>

            <hr />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {item.imageurl &&
                    item.imageurl.map((i, index) => (
                        <img
                            key={index}
                            src={i}
                            alt=""
                            height="240"
                            width="240"
                        />
                    ))}
            </div>
        </>
    );
};

export default ProductDetails;
