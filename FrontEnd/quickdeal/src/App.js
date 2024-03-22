import { Routes, Route, Router } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signin from "./Components/Signup/Signup";
import Home from "./Components/Dashboard/Home";
import Products from "./Components/Sell_products/Products";
import ProductDetails from "./Components/Dashboard/productDetails";
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
            </Routes>
        </>
    );
}

export default App;
