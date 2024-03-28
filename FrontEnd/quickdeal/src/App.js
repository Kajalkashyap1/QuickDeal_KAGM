import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signin from "./Components/Signup/Signup";
import Home from "./Components/Dashboard/Home";
import Products from "./Components/Sell_products/Products";
import ProductDetails from "./Components/Dashboard/productDetails";
import Resetpassword from "./Components/ResetPassword/Resetpassword";
import ChattingComponent from "./Components/ChattingComponent/Chatting";
import io from "socket.io-client";
import Myads from "./Components/MyAds/Myads";
const socket = io.connect("http://localhost:8000");
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
            </Routes>
        </>
    );
}

export default App;
