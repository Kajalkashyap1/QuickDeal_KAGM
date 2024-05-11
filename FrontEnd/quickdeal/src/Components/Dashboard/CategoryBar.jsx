import React, { useState } from "react";
import style from "./Categories.module.css"; // Assuming you've saved the CSS in a file named Categories.css
import { options, staticOptions } from "../Assets/categories";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Dropdown from "react-bootstrap/Dropdown";
import { NavDropdown } from "react-bootstrap";
import { withWidth } from "@material-ui/core";
// import { NavDropdown } from "react-bootstrap";

const CategoryBar = ({ onSelectedCategories2e, onClearFilter2 }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleCategoryChange = (event) => {
        const { id, checked } = event.target;
        onSelectedCategories2e({ id, checked });
    };
    const handleClearFilter = () => {
        document
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkbox) => {
                checkbox.checked = false;
            });
        onClearFilter2();
    };
    return (
        <nav className={`${style.navbar} ${style.hide2}`}>
            <div className={style.categoryscroll}>
                <ul className={style.category_checkboxes}>
                    {staticOptions.map((item2, index) => {
                        return (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    id={item2.value}
                                    onChange={handleCategoryChange}
                                />
                                <label
                                    htmlFor={item2.value}
                                    style={{ marginLeft: "10px" }}>
                                    {item2.label}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={style.navbarcontent}>
                <div>
                    <NavDropdown
                        title="All Categories"
                        show={showDropdown}
                        onToggle={(isOpen) => setShowDropdown(isOpen)}
                        className={style.dropDownMenu}>
                        <div className={style.dropdownScroll}>
                            {options
                                .sort((a, b) => a.label.localeCompare(b.label)) // Sort options alphabetically by label
                                .map((item, index) => (
                                    <li
                                        className={style.list}
                                        key={index}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            id={item.value}
                                            onChange={handleCategoryChange}
                                            style={{ cursor: "pointer" }}
                                        />
                                        <label
                                            htmlFor={item.value}
                                            style={{
                                                cursor: "pointer",
                                                marginLeft: "10px",
                                            }}>
                                            {item.label}
                                        </label>
                                    </li>
                                ))}
                        </div>
                    </NavDropdown>
                </div>
                <div className={style.clear_div}>
                    <button
                        className="clear_filter"
                        onClick={handleClearFilter}>
                        Clear Filter
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default CategoryBar;
