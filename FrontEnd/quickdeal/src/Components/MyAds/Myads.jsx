import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Myads = () => {
    const { userid } = useParams();
    const [ads, setads] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/myads/${userid}`)
            .then((res) => {
                setads(res.data.result);
            })
            .catch((err) => {
                console.log("error in fetching my ads ", err);
            });
    }, []);

    return <div>myads id : {userid}</div>;
};

export default Myads;
