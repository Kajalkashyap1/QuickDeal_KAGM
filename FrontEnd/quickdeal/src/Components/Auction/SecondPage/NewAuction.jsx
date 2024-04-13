import React from 'react'
import style from './NewAuction.module.css'
import Navbar from "../../Navbar/Navbar";
import AuctionCard from './AuctionCard';

const NewAuction = () => {
  return (
    <>
        <Navbar/>
        <div className={style.main_container}>

            <div className={style.left_container}>
              <div className={style.card_container}>
                    <AuctionCard/>
              </div>
            </div>
            {/* Add a vertical line between left and right containers */}
            <div className={style.vertical_line}></div>
            <div className={style.right_container}>
            right
            </div>

        </div>
    </>
    
  )
}

export default NewAuction