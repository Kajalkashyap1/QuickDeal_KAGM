import React from "react";
import style from "./EditProfile.module.css";
import { useParams } from "react-router-dom";

const EditProfile = () => {
    const { userid } = useParams();

    return (
        <div className={style.wrapper}>
            <h3>Edit Profile</h3>
            <div className={style.inputs}>
                <h5>Basic Information</h5>
                <input
                    type="text"
                    className="{style.input}"
                    placeholder="name"
                    required
                />
            </div>
        </div>
    );
};

export default EditProfile;
