import React, { useState } from "react";
import style from "./Categories.module.css"; // Assuming you've saved the CSS in a file named Categories.css
import options from "../Assets/categories";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dropdown from 'react-bootstrap/Dropdown';
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
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            All Category 
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
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
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
               
                <ul className={style.category_checkboxes}>
                    {options.slice(0,8).map((item, index) => {
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
