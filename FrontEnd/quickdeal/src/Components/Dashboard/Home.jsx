import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Cardcomponent from "./Cardcomponent";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { useNavigate } from "react-router-dom";
import "./Home";
const Home = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isauth, setauth] = useState("");
    const [name, setname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [image, setimage] = useState("");
    const [userid, setuserid] = useState("");

    // -------------- checking if user login or not --------------------

    useEffect(() => {
        axios
            .get("http://localhost:8000/auth/islogin")
            .then((res) => {
                if (res.data.status === "error") {
                    setauth(false);
                } else if (res.data.status === "success") {
                    setauth(true);
                    setuserid(res.data.id);
                    setname(res.data.name);
                    setuseremail(res.data.email);
                    setimage(res.data.image);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // ---------------------- geting posts from DB -------------------

    const [items, setitems] = useState([]);
    const [renderitems, setrenderitems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/getposts`)
            .then((res) => {
                setitems(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        setrenderitems(
            items?.filter(
                (item) => item.useremail !== useremail && !item.hasSold
            )
        );
    }, [items]);
    const authdetail = { isauth, name, useremail, image, userid };
    // ------------------- handle search bar keyword change---------------
    const [searchKeyword, setSearchKeyword] = useState("");
    let filteredCards = items;
    const handleSearchChange = (keyword) => {
        setSearchKeyword(keyword.trim());

        if (!keyword) {
            // If the search bar is empty, render all items
            const withoutFilter = items?.filter(
                (card) => !card.hasSold && card.useremail != useremail
            );
            setrenderitems(withoutFilter);
        } else {
            filteredCards = items?.filter(
                (card) =>
                    (card.adtitle
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase()) ||
                        card.description
                            .toLowerCase()
                            .includes(searchKeyword.toLowerCase()) ||
                        card.productname
                            .toLowerCase()
                            .includes(searchKeyword.toLowerCase()) ||
                        (Array.isArray(card.category) &&
                            card.category.some(
                                (category) =>
                                    typeof category === "string" && // Check if category is a string
                                    category
                                        .toLowerCase()
                                        .includes(searchKeyword.toLowerCase())
                            ))) &&
                    !card.hasSold &&
                    card.useremail != useremail
            );
            setrenderitems(filteredCards);
        }
    };

    const handleCategoryFilterChange = (categoryArray) => {
        // If categoryArray is empty, render all items
        if (categoryArray.length === 0) {
            const withoutFilter = items?.filter(
                (card) => !card.hasSold && card.useremail !== useremail
            );
            setrenderitems(withoutFilter);
        } else {
            const filteredCards = items?.filter((card) => {
                // Check if card matches any category in categoryArray
                return (
                    !card.hasSold &&
                    card.useremail !== useremail &&
                    categoryArray.some((category) =>
                        Array.isArray(card.category)
                            ? card.category.includes(category)
                            : card.category === category
                    )
                );
            });
            setrenderitems(filteredCards);
        }
    };

    // --------- handles click on cards------------
    const handleClick = (id) => {
        if (isauth) navigate(`/product/${id}`);
    };

    return (
        <>
            <Navbar
                searchbar="true"
                onSearchChange={handleSearchChange}
                onCategoryFilterChange={handleCategoryFilterChange}
            />
            <div className="main">
                <div className="div-main formargin">
                    {renderitems.map((card) => (
                        <Cardcomponent
                            key={card._id}
                            onClick={handleClick}
                            usermail={useremail}
                            item={card}
                        />
                    ))}
                    {renderitems.length === 0 &&
                        Array.from({ length: 12 }).map((_, index) => (
                            <Card key={index} style={{ width: "18rem" }}>
                                <Card.Img
                                    variant="top"
                                    src="https://res.cloudinary.com/dsaaqhang/image/upload/v1712133539/searchnot_found_1_fp8qb2.png"
                                    height="190px"
                                />
                                <Card.Body>
                                    <Placeholder
                                        as={Card.Title}
                                        animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder
                                        as={Card.Text}
                                        animation="glow">
                                        <Placeholder xs={7} />{" "}
                                        <Placeholder xs={4} />{" "}
                                        <Placeholder xs={4} />{" "}
                                        <Placeholder xs={6} />{" "}
                                        <Placeholder xs={8} />
                                    </Placeholder>
                                </Card.Body>
                            </Card>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Home;
