const cloudinary = require("cloudinary").v2;
require("dotenv").config();
exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("Connected to Cloudinary !");
    } catch (error) {
        console.log("Error in Cloudinary connection ", errr.message);
    }
};
