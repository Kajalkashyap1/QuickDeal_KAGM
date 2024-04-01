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
function App() {
    return (
        <>
            <Routes>
                {/* <Route
                    path="/new/:id"
                    render={(props) => (
                        <NewComponent {...props} customProp="value" />
                    )}
                /> */}
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
                <Route path="*" element={<Pagenotfound />} />
            </Routes>
        </>
    );
}

export default App;
