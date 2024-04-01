import React, { useEffect } from "react";
import style from "./EditProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

import EditNoteIcon from "@mui/icons-material/EditNote";
const EditProfile = () => {
    const { userid } = useParams();
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
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
    return (
        <>
            <Navbar searchbar={false} />
            <div className={style.wrapper}>
                <div className={style.left}>
                    <h3>Profile Picture</h3>
                    <div className={style.profile_img}>
                        <img src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"></img>
                    </div>

                    <div className={style.editprofile_btn}>
                        <button className={style.btn}>
                            <EditNoteIcon />
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className={style.right}>
                    <h3>Edit Profile</h3>
                    <div className={style.inputs}>
                        <h5>Basic Information</h5>
                        <input
                            type="text"
                            className={style.input}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            className={style.input_area}
                            placeholder="About me(optional)"
                        />

                        <hr />
                        <h5> Contact Information</h5>
                        <input
                            type="number"
                            className={style.input}
                            placeholder="Contact Number"
                        />

                        <input
                            type="email"
                            className={style.input}
                            placeholder="Email"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
