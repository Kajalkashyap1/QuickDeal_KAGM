import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css'; // Assuming you've saved the CSS in a file named Categories.css
import { NavLink } from 'react-bootstrap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGadgetsCheckboxClick = () => {
    window.location.href = "/product"; // Navigate to home page when "Gadgets" checkbox is clicked
  };
  const handleGadgetsCheckbox = () => {
    window.location.href = "/Furniture"; // Navigate to home page when "Gadgets" checkbox is clicked
  };


  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div className='logo-text'>
          <p className=''>All Category</p>
          <ArrowDropDownCircleTwoToneIcon/>
          <select value={selectedCategory} onChange={handleCategoryChange}>
                
            <option value="all">All</option>
            <option value="stationary">Stationary</option>
            <option value="gadgets">Gadgets</option>
            <option value="electronics">Electronics & Appliances</option>
            <option value="furniture">Furniture</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="sports">Sports & Fitness</option>
            <option value="toys">Toys & Games</option>
            <option value="hobbies">Hobbies</option>
            <option value="realEstate">Real Estate</option>
            <option value="healthWellness">Health & Wellness</option>
            <option value="toolsEquipment">Tools & Equipment</option>
            <option value="jewellery">Jewellery</option>
            <option value="cellPhonesAccessories">Cell Phones & Accessories</option>
            <option value="transportation">Transportation</option>
            <option value="pets">Pets</option>
            <option value="artsCrafts">Arts & Crafts</option>
            <option value="musicalInstruments">Musical Instruments</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Category Dropdown */}
        {selectedCategory !== "all" && (
          <ul className="category-checkboxes">
            <li>
              <input type="checkbox" id="stationary" name="category" />
              <label htmlFor="stationary">Stationary</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="gadgets"
                name="category"
                onClick={handleGadgetsCheckboxClick} // Attach onClick event handler to the checkbox
              />
              <label htmlFor="gadgets">Gadgets</label>
            </li>
            <li>
              <input type="checkbox" id="electronics" name="category" />
              <label htmlFor="electronics">Electronics & Appliances</label>
            </li>
            <li>
              <input type="checkbox" id="furniture" name="category"
              onClick={handleGadgetsCheckbox} />
              <label htmlFor="furniture">Furniture</label>
            </li>
            <li>
              <input type="checkbox" id="fashion" name="category" />
              <label htmlFor="fashion">Fashion</label>
            </li>
            <li>
              <input type="checkbox" id="books" name="category" />
              <label htmlFor="books">Books</label>
            </li>
            <li>
              <input type="checkbox" id="sports" name="category" />
              <label htmlFor="sports">Sports & Fitness</label>
            </li>
            <li>
              <input type="checkbox" id="toys" name="category" />
              <label htmlFor="toys">Toys & Games</label>
            </li>
            <li>
              <input type="checkbox" id="hobbies" name="category" />
              <label htmlFor="hobbies">Hobbies</label>
            </li>
            <li>
              <input type="checkbox" id="realEstate" name="category" />
              <label htmlFor="realEstate">Real Estate</label>
            </li>
            <li>
              <input type="checkbox" id="healthWellness" name="category" />
              <label htmlFor="healthWellness">Health & Wellness</label>
            </li>
            <li>
              <input type="checkbox" id="toolsEquipment" name="category" />
              <label htmlFor="toolsEquipment">Tools & Equipment</label>
            </li>
            <li>
              <input type="checkbox" id="jewellery" name="category" />
              <label htmlFor="jewellery">Jewellery</label>
            </li>
            <li>
              <input type="checkbox" id="cellPhonesAccessories" name="category" />
              <label htmlFor="cellPhonesAccessories">Cell Phones & Accessories</label>
            </li>
            <li>
              <input type="checkbox" id="transportation" name="category" />
              <label htmlFor="transportation">Transportation</label>
            </li>
            <li>
              <input type="checkbox" id="pets" name="category" />
              <label htmlFor="pets">Pets</label>
            </li>
            <li>
              <input type="checkbox" id="artsCrafts" name="category" />
              <label htmlFor="artsCrafts">Arts & Crafts</label>
            </li>
            <li>
              <input type="checkbox" id="musicalInstruments" name="category" />
              <label htmlFor="musicalInstruments">Musical Instruments</label>
            </li>
            {/* Add more category checkboxes as needed */}
          </ul>
        )}

        {/* Auth Buttons */}
      </div>
    </nav>
  );
};

export default CategoryBar;