const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const postdata = require("../../Models/postdata");

const clouduploadimage = async (req, res) => {
    // console.log(req.body);
    let imagesecureurl = [];
    try {
        const parentfile = req.files["images[]"];
        // console.log(parentfile.length);
        // Check if parentfile is an array (multiple files) or an object (single file)
        if (Array.isArray(parentfile)) {
            for (let i = 0; i < parentfile.length; i++) {
                const file = parentfile[i];
                const url = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: process.env.CLOUDINARY_FOLDER_NAME,
                        use_filename: true,
                    }
                );
                imagesecureurl.push(url.secure_url);
            }
        } else {
            // Handle single file
            const file = parentfile;
            const url = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: process.env.CLOUDINARY_FOLDER_NAME,
                use_filename: true,
            });
            imagesecureurl.push(url.secure_url);
        }
        const postvalues = {
            userid: req.body.userid,
            useremail: req.body.useremail,
            username: req.body.username,
            productname: req.body.productName,
            adtitle: req.body.adTitle,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            imageurl: imagesecureurl,
        };
        try {
            const insertdata = new postdata(postvalues);
            const indata = await insertdata.save();
            return res.json({
                status: "success",
                message: "Post created successfully",
            });
        } catch (e) {
            res.json({
                status: "error",
                message: "Error creating post",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "error",
            message: "image not uploaded ",
        });
    }
};
module.exports = clouduploadimage;
