import React, { useState } from "react";
import CategoryBar from "./CategoryBar";
const Categories = ({ onSelectedCategoriesChange, onClearFilter3 }) => {
    const sendtoparent = (data) => {
        onSelectedCategoriesChange(data);
    };
    const clearfilterparent = () => {
        onClearFilter3();
    };
    return (
        <div className="cat-container d-flex justify-content-between">
            <CategoryBar
                onSelectedCategories2e={sendtoparent}
                onClearFilter2={clearfilterparent}
            />
        </div>
    );
};

export default Categories;
