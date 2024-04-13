import React from "react";
import stylemain from "./mainauction.module.css";
import Navbar from "../../Navbar/Navbar";
const Mainauction = () => {
    return (
        <>
            <Navbar />
            <div className={stylemain.maincontainer}>
                <div className={stylemain.firstcol}>
                    <div className={stylemain.productcontainer}>
                        <img src="" alt="" srcset="" />
                        
                    </div>
                </div>
                <div className={stylemain.secondcol}></div>
                <dic className={stylemain.thirdcol}></dic>
            </div>
        </>
    );
};

export default Mainauction;
