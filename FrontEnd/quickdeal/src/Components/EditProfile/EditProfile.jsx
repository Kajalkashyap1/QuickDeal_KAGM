import React, { useEffect, useState } from "react";
import style from "./EditProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

import EditNoteIcon from "@mui/icons-material/EditNote";
const EditProfile = () => {
    const { userid } = useParams();
    axios.defaults.withCredentials = true;
    const [userinfo, setuserinfo] = useState();
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
    useEffect(() => {
        axios
            .get(`http://localhost:8000/profile/getuserinfo/${userid}`)
            .then((res) => {
                if (res.data.status === "error") {
                    // setauth(false);
                    navigate("/login");
                } else if (res.data.status === "success") {
                    // setauth(true);
                    setuserinfo(res.data.data[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userid]);
    console.log(userinfo);
    return (
        <>
            <Navbar searchbar={false} />
            <div className={style.wrapper}>
                <div className={style.left}>
                    <h3>Profile Picture</h3>
                    <div className={style.profile_img}>
                        <img src={userinfo?.imageurl}></img>
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
                            value={userinfo?.fullname}
                        />

                        <hr />
                        <h5> Contact Information</h5>

                        <input
                            type="number"
                            className={style.input}
                            placeholder="Contact Number"
                            defaultValue={userinfo?.contactNo || ""}
                        />

                        <input
                            type="email"
                            className={style.input}
                            placeholder="Email"
                            value={userinfo?.email}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
