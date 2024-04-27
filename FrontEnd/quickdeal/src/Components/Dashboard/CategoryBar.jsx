import React, { useState } from "react";
import style from "./Categories.module.css"; // Assuming you've saved the CSS in a file named Categories.css
import options from "../Assets/categories";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Dropdown from "react-bootstrap/Dropdown";
import { NavDropdown } from "react-bootstrap";
import { withWidth } from "@material-ui/core";
// import { NavDropdown } from "react-bootstrap";

const CategoryBar = ({ onSelectedCategories2e }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleCategoryChange = (event) => {
        const { id, checked } = event.target;
        onSelectedCategories2e({ id, checked });
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={style.navbar}>
            <div className={style.navbarcontent}>
                {/* <span>All Category <KeyboardArrowDownIcon/> </span> */}
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
                                                marginLeft: "5px",
                                            }}>
                                            {item.label}
                                        </label>
                                    </li>
                                ))}
                        </div>
                    </NavDropdown>
                </div>

                <div>
                    <ul className={style.category_checkboxes}>
                        {options.slice(0, 7).map((item, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        id={item.value}
                                        onChange={handleCategoryChange}
                                    />
                                    <label htmlFor={item.value}>
                                        {item.label}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default CategoryBar;
