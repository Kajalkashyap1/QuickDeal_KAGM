import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        // width: "70vw",
        margin: "auto",
        backgroundColor: "#64646417",
    },
    message: {
        marginBottom: theme.spacing(2),
        textAlign: "center",
        color: "#555",
    },
    button: {
        backgroundColor: "#4a3980f7",
        color: "#fff",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "#db0030",
        },
    },
}));

const Notfound = (props) => {
    const classes = useStyles();

    const ismyad = props.name === "myad";
    const iswishlist = props.name === "wishlist";
    return (
        <div className={classes.container}>
            <Typography variant="h4" className={classes.message}>
                Oops! {props.title}
            </Typography>
            <Typography variant="body1" className={classes.message}>
                {props.subtitle}
            </Typography>

            {ismyad && (
                <Button
                    variant="contained"
                    component={Link}
                    to="/sell"
                    className={classes.button}>
                    Create Post
                </Button>
            )}
            {iswishlist && (
                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    className={classes.button}>
                    Checkout posts
                </Button>
            )}
        </div>
    );
};

export default Notfound;
