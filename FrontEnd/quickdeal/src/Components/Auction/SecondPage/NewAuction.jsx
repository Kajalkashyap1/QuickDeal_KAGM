import React, { useEffect, useState } from "react";
import style from "./NewAuction.module.css";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import CurrencyInput from "react-currency-input-field";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
const useStyles = makeStyles({
    selected: {
        border: "1px solid green",
        width: "100%",
        display: "flex",
        height: "120px",
    },
    cardContent: {
        display: "flex",
        alignItems: "center", // Align items vertically centered
        width: "100%",
        margin: "10px",
        alignContent: "center",
        justifyContent: "space-evenly",
    },

    smallImage: {
        marginRight: "10px",
        width: "200px",
        height: "70px",
        aspectRatio: 3 / 2,
        objectFit: "contain",
    },

    notselected: {
        width: "100%",
        backgroundColor: "#b7b7b745",
        display: "flex",
        height: "120px",
        flexDirection: "row",
    },
});

const NewAuction = () => {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [ads, setads] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [minutes, setminutes] = useState(0);
    const [seconds, setseconds] = useState(0);
    const [auctionEndtime, setauctionEndtime] = useState("");
    const [selectedcard, setselectedcard] = useState([]);
    const [price, setprice] = useState("");
    const [loading, setloading] = useState(false);
    // ----------start auction form submit ---------------
    const handleStartAuction = (e) => {
        e.preventDefault();
        if (selectedcard == "") {
            toast.error("Please select a product ", {
                position: "top-right",
                autoClose: 1300,
            });
            return;
        }
        if (auctionEndtime == "") {
            toast.error("Please select Auction ending time ", {
                position: "top-right",
                autoClose: 1300,
            });
            return;
        }
        if (price == undefined) {
            toast.error("Please set amount of product ", {
                position: "top-right",
                autoClose: 1300,
            });
            return;
        }
        const data = {
            owner: userid,
            productid: selectedcard._id,
            activetill: auctionEndtime,
            amountforauction: price,
        };
        setloading(true);
        axios
            .post("http://localhost:8000/auction/startauction", data)
            .then((res) => {
                setloading(false);
                if (res.data.status == "success") {
                    toast.success("Auction created successfully ! ", {
                        position: "top-right",
                        autoClose: 1300,
                    });
                    setTimeout(() => {
                        navigate(
                            `/auction_main_page/product/${res.data.insertdata._id}`
                        );
                    }, 1400);
                } else {
                    toast.error("Error while creating Auction ", {
                        position: "top-right",
                        autoClose: 1300,
                    });
                }
            })
            .catch((err) => {
                setloading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        setprice(selectedcard.price);
    }, [selectedcard]);
    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };
    useEffect(() => {
        setminutes(selectedTime?.$m);
        setseconds(selectedTime?.$s);
    }, [selectedTime]);

    useEffect(() => {
        if (minutes == undefined || seconds == undefined) return;
        const currentDate = new Date();

        const newDate = new Date(
            currentDate.getTime() + minutes * 60000 + seconds * 1000
        );
        // Format the resulting date object back into the desired format
        const newDateTime = newDate.toISOString();
        if (minutes == 0 && seconds == 0) setauctionEndtime("");
        else setauctionEndtime(newDateTime);
    }, [minutes, seconds]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/dashboard/myads/${userid}`)
            .then((res) => {
                setads(res.data.result);
            })
            .catch((err) => {
                console.log("error in fetching ads in newauction ", err);
            });
    }, [userid]);
    const classes = useStyles();
    const [selectedId, setSelectedId] = useState();

    const handleClick = (id, item) => () => {
        setSelectedId(id);
        setselectedcard(item);
    };
    return (
        <>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                theme="dark"
            />
            {loading ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="purple"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <br />
                    <i>
                        Creating Auction for you , please don't close the screen
                    </i>
                </div>
            ) : (
                <div className={style.main_container}>
                    <div className={style.left_container}>
                        <h2>Select a product</h2>
                        <hr />
                        <div className={style.scroll}>
                            {ads?.map((item, index) => (
                                <Card
                                    key={index}
                                    className={
                                        index === selectedId
                                            ? classes.selected
                                            : classes.notselected
                                    }>
                                    <CardActionArea
                                        onClick={handleClick(index, item)}>
                                        <CardContent
                                            className={classes.cardContent}>
                                            <img
                                                src={item.imageurl[0]}
                                                alt=""
                                                className={classes.smallImage}
                                            />
                                            <Typography
                                                className={classes.maindiv}>
                                                <div>{item.productname}</div>
                                            </Typography>
                                            <Tooltip
                                                onClick={() => {
                                                    navigate(
                                                        `/myads/preview/${
                                                            item._id
                                                        }/${true}`
                                                    );
                                                }}
                                                title="View ad"
                                                arrow>
                                                <IconButton>
                                                    <VisibilityIcon fontSize="large" />
                                                </IconButton>
                                            </Tooltip>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                    </div>
                    {/* Add a vertical line between left and right containers */}
                    <div className={style.vertical_line}></div>
                    <div className={style.right_container}>
                        <h3>Set the ending time and Update amount</h3>
                        <hr />
                        <div className={style.clockandamount}>
                            {selectedcard != "" && (
                                <div>
                                    <h5>Selected product for Auction</h5>

                                    <div
                                        className="card"
                                        aria-hidden="true"
                                        style={{ width: "38rem" }}>
                                        <div
                                            className="card-body row-2 d-flex "
                                            style={{
                                                justifyContent: "center",
                                            }}>
                                            <img
                                                src={selectedcard.imageurl[0]}
                                                className="card-img-top"
                                                alt="..."
                                                style={{
                                                    aspectRatio: 3 / 2,
                                                    objectFit: "contain",
                                                    width: "200px",
                                                    marginLeft: "10px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            <div
                                                className="d-flex"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    fontFamily: "monospace",
                                                    fontWeight: "700",
                                                }}>
                                                <h3 className="card-text placeholder-glow">
                                                    ₹ {selectedcard.price}
                                                </h3>
                                                <h5 className="card-text placeholder-glow">
                                                    👉{" "}
                                                    {selectedcard.productname}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <br />
                            {selectedcard == "" && (
                                <div
                                    className="card"
                                    aria-hidden="true"
                                    style={{ width: "38rem" }}>
                                    <div className="card-body">
                                        <h5 style={{ color: "purple" }}>
                                            Please select a product from list
                                        </h5>
                                        <h5 className="card-title placeholder-glow">
                                            <span className="placeholder col-6"></span>
                                        </h5>
                                        <p className="card-text placeholder-glow">
                                            <span className="placeholder col-7"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-6"></span>
                                            <span className="placeholder col-8"></span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            <hr />
                            <h5 style={{ color: "purple" }}>
                                {" "}
                                Set the auction closing time and update the
                                selling price.
                            </h5>
                            <form>
                                <div className={style.amountanstimeflex}>
                                    <div
                                        style={{
                                            marginTop: "20px",
                                            marginRight: "30px",
                                        }}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={[
                                                    "MobileTimePicker",
                                                    "MobileTimePicker",
                                                ]}>
                                                <MobileTimePicker
                                                    label={'"Minutes:Seconds"'}
                                                    openTo="minutes"
                                                    views={[
                                                        "minutes",
                                                        "seconds",
                                                    ]}
                                                    format="mm:ss"
                                                    value={selectedTime}
                                                    onChange={handleTimeChange}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "20px",
                                            marginLeft: "30px",
                                        }}>
                                        <CurrencyInput
                                            id="input-example"
                                            name="input-name"
                                            style={{
                                                height: "57px",
                                                fontSize: "large",
                                            }}
                                            placeholder="Please enter amount"
                                            value={price}
                                            decimalsLimit={2}
                                            prefix="₹"
                                            onValueChange={(
                                                value,
                                                name,
                                                values
                                            ) => setprice(value)}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* <CountdownTimer targetDate={auctionEndtime} /> */}
                                <br />
                                <Button
                                    type="submit"
                                    onClick={handleStartAuction}
                                    variant="outlined"
                                    startIcon={<SendIcon fontSize="large" />}
                                    style={{
                                        color: "orangered", // Green color
                                        borderColor: "green", // Green color
                                        fontWeight: "600",
                                        fontSize: "large",
                                        border: "1px solid green",
                                        padding: "13px",
                                        borderRadius: "12px",
                                    }}>
                                    Start Auction
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewAuction;
