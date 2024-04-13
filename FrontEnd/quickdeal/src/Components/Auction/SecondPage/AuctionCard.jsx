import React from 'react'
import style from './AuctionCard.module.css'

const AuctionCard = () => {
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };
  return (
    <div className={style.main_container}>
        
        <div className={style.product_content}>

            <div className={style.image}>
                <img src='https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png'></img>
            </div>
            
                {/* product price */}
                <div className={style.productrightcontent}>
                    <div className={style.product_price}>
                        <b>👉&emsp;Price:</b>₹{" "}
                        {1000}
                    </div>
                    {/* products name */}
                    <div className={style.product_name}>
                            <b>&emsp;👉&emsp;Product Name:</b>{" "}
                                Oil painting
                    </div>
                    {/* product title */}
                    <div className={style.product_title}>
                            <b>&emsp;👉&emsp;Product Title:</b>{" "}
                            Hand-made painting
                    </div>
                    {/* product description */}
                    <div className={style.product_description}>
                            <b>&emsp;👉&emsp;Description:</b>{" "}
                            Handmade wall paintings are one of the most delicate pieces of art that need to handled with utmost care. 
                    </div>
                    {/* product published date */}
                    <div className={style.publish_date}>
                            <b>&emsp;👉&emsp;Published on:</b> 📅
                            {formatDate()}
                    </div>
                </div>
        </div>
    </div>
  )
}

export default AuctionCard