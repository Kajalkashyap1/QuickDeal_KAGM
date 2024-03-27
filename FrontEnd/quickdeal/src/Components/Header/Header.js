import style from "./Header.module.css";

function Header() {
    return (
        <div className={style.Header} style={{ padding: "5px" }}>
            <img src="https://res.cloudinary.com/dsaaqhang/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,h_80,q_auto:best,w_140,z_2/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png"></img>
        </div>
    );
}

export default Header;
