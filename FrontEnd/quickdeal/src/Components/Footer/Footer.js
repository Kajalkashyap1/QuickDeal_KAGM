import React from "react";
import style from "./Footer.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Footer = () => {
  return (
    <div className={style.main}>
        <div className={style.left}>
            
            <img src="https://res.cloudinary.com/dsaaqhang/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,h_80,q_auto:best,w_140,z_2/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png" alt="QuickDeal"></img>
          
        </div>
        <div className={style.right}>
          <div className={style.info}>
                    <LocationOnIcon/> 
                    MNNIT ALLAHABD, PRAYAGRAJ, UTTAR PRADESH
                </div>
                <div className={style.info}>
                    <ContactMailIcon/>
                    <a id={style.link} href='mailto:kajal.2022ca041@mnnit.ac.in'>kajal.2022ca041@mnnit.ac.in</a>
                </div>
          </div>
    </div>
  )
}

export default Footer;
