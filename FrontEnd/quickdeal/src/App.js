import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signin from "./Components/Signup/Signup";
import Home from "./Components/Dashboard/Home";
import Products from "./Components/Sell_products/Products";
function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route path="/login" Component={Login} />
                <Route path="/signin" Component={Signin} />
                <Route path="/sell" Component={Products}/>
            </Routes>
        </>
    );
}

export default App;
