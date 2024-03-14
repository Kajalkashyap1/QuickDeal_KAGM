import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="Header">
            <h1>QUICK DEAL</h1>
            <div className="SearchBar">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>
            <a href="#">Dummy Link</a>
        </div>
    );
}

export default Navbar;
