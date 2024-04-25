import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signin from "./Components/Signup/Signup";
import Home from "./Components/Dashboard/Home";
import Products from "./Components/Sell_products/Products";
import ProductDetails from "./Components/Dashboard/productDetails";
import Resetpassword from "./Components/ResetPassword/Resetpassword";
import ChattingComponent from "./Components/ChattingComponent/Chatting";
import Myads from "./Components/MyAds/Myads";
import Pagenotfound from "./Components/NotfoundComponent/pagenotfound";
import Wishlist from "./Components/WishList/Wishlist";
import EditProfile from "./Components/EditProfile/EditProfile";
<<<<<<< HEAD
import AuctionDashboard from "./Components/Auction/AuctionDashboard";
import Categories from "./Components/Dashboard/Categories";
=======
import AuctionDashboard from "./Components/Auction/Firstpage/AuctionDashboard";
import NewAuction from "./Components/Auction/SecondPage/NewAuction";
import Mainauction from "./Components/Auction/Main_auction_page/Mainauction";
>>>>>>> 72790e3df080f0b99d37c892830aa712a406b839

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/sell" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/resetpasscode" element={<Resetpassword />} />
                <Route
                    path="/chat/:buyer/:seller"
                    element={<ChattingComponent />}
                />
                <Route path="/myads/:userid" element={<Myads />} />
                <Route
                    path="/myads/preview/:id/:preview"
                    element={<ProductDetails />}
                />
                <Route path="/wishlist/:userid" element={<Wishlist />} />
                <Route path="/edit_profile/:userid" element={<EditProfile />} />
                <Route
                    path="/AuctionDashboard/:userid"
                    element={<AuctionDashboard />}
                />
<<<<<<< HEAD
                <Route path="/categories" element={<Categories />} />
=======
                <Route path="/NewAuction/:userid" element={<NewAuction />} />
                <Route
                    path="/auction_main_page/product/:auctionid"
                    element={<Mainauction />}
                />
>>>>>>> 72790e3df080f0b99d37c892830aa712a406b839
                <Route path="*" element={<Pagenotfound />} />
                
            </Routes>
        </>
    );
}

export default App;
