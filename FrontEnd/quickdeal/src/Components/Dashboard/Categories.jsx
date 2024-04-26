import React, { useState } from "react";
import CategoryBar from "./CategoryBar";
const Categories = ({ onSelectedCategoriesChange }) => {
    const sendtoparent = (data) => {
        onSelectedCategoriesChange(data);
    };
    return (
        <div className="cat-container d-flex justify-content-between">
            <CategoryBar onSelectedCategories2e={sendtoparent} />
        </div>
    );
};

export default Categories;
