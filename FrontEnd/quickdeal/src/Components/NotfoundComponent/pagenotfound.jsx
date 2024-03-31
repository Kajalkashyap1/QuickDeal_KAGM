import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import ImageNotFound from "./not-found-image.png"; // Import your image file

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: theme.spacing(4),
        textAlign: "center",
    },
    image: {
        marginBottom: theme.spacing(2),
        maxWidth: "40%",
        height: "auto",
    },
    message: {
        marginBottom: theme.spacing(2),
        color: "#555",
    },
}));

const Pagenotfound = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <img
                src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711881102/error-404_l8cetv.png"
                alt="Page Not Found"
                className={classes.image}
            />
            <Typography variant="h4" className={classes.message}>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" className={classes.message}>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </Typography>
        </div>
    );
};

export default Pagenotfound;
