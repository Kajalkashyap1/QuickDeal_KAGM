const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const postdata = require("../../Models/postdata");
const nodemailer = require("nodemailer");
const clouduploadimage = async (req, res) => {
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
                        quality: "30",
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
            category: req.body["category[]"],
            price: req.body.price,
            location: req.body.location,
            imageurl: imagesecureurl,
        };
        try {
            const insertdata = new postdata(postvalues);
            const indata = await insertdata.save();

            //-------------- sending mail on ad posting -------------------------------

            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                });

                let info = await transporter.sendMail({
                    from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
                    to: postvalues.useremail,
                    subject: "Post confirmation",
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #fff; /* Light background color */
                        color: #333; /* Text color */
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #f5f5f5; /* Lighter container background color */
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Darker box shadow */
                    }
                    h2, h3 {
                        color: #333; /* Darker heading color */
                        text-align: center; /* Center align heading */
                    }
                    p {
                        color: #666; /* Darker paragraph color */
                        text-align: center; /* Center align paragraph */
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .post-details {
                        margin-top: 20px;
                        text-align: left; /* Align post details to the left */
                    }
                    .post-details img {
                        display: block; /* Ensure image displays properly */
                        margin: 0 auto 20px; /* Center image and add margin */
                        max-height: 200px; /* Limit image height */
                    }
                    .details{
                        display:"flex";
                        flex-direction:"column";
                        justify-content: "flex-start";
                    }
                    .name{
                        text-transform: capitalize;
                    }
                    </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="logo">
                                <img src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png" alt="Logo" style="height: 80px;">
                            </div>
                            <h2>Hello👋,<span class="name"> ${postvalues.username} </span></h2>
                            <h3>Thank you for creating a post!</h3>
                            <p>Your post details:</p>
                            <div class="post-details">
                            <img src=${postvalues.imageurl[0]}  alt="image" style="height: 210px;">
                                <div class="details">
                                    <p><strong>Product Name:</strong> ${postvalues.productname}</p>
                                    <p><strong>Ad Title:</strong> ${postvalues.adtitle}</p>
                                    <p><strong>Description:</strong> ${postvalues.description}</p>
                                    <p><strong>Price:</strong> ${postvalues.price}</p>
                                    <p><strong>Location:</strong> ${postvalues.location}</p>
                                </div>
                            </div>
                            <p class="note">Note: This email confirms the creation of your post. If you have any questions or need further assistance, feel free to contact us.</p>
                        </div>
                    </body>
                    </html>
                    
                        `,
                });
            } catch (error) {
                console.log(
                    "Error in sending mail after ad posting ",
                    error.message
                );
            }
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
