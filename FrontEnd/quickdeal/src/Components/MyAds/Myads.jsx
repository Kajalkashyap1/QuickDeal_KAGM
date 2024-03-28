import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const Myads = () => {
    const { userid } = useParams();
    const [ads, setads] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/myads/${userid}`)
            .then((res) => {
                if (res.data.status == "success") {
                    setads(res.data.ads);
                    // console.log(res.data.ads);
                    console.log(ads);
                }
            })
            .catch((err) => {
                console.log("error in fetching my ads ", err);
            });
    }, []);

    return <div>myads id : {userid}</div>;
};

export default Myads;
