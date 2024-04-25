import React, { useState } from "react";
import "./Categories.css"; // Assuming you've saved the CSS in a file named Categories.css
import options from "../Assets/categories";
const CategoryBar = ({ onSelectedCategories2e }) => {
    const handleCategoryChange = (event) => {
        const { id, checked } = event.target;
        onSelectedCategories2e({ id, checked });
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <ul className="category-checkboxes">
                    {options.map((item, index) => {
                        return (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    id={item.value}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={item.value}>{item.label}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default CategoryBar;
