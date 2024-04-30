const auctionproduct = require("../../Models/auctionproduct");
const userdata = require("../../Models/userdata");
const postdata = require("../../Models/postdata");
const nodemailer = require("nodemailer");
const startauction = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const insertdata = new auctionproduct(data);
        const users = await userdata.find();
        const recipients = users.map((user) => user.email);
        await insertdata.save();
        const postDetails = await postdata.find({ _id: data.productid });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        // Create a string of comma-separated email addresses
        let bccList = recipients.join(",");
        const date = new Date(data.activetill);

        // Convert to local time zone
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        const localDateTime = date
            .toLocaleString("en-US", options)
            .replace(" at", "");
        // Send the email with the recipients specified in the bcc field
        let info = await transporter.sendMail({
            from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
            bcc: bccList,
            subject: "Auction Started! ",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5; /* Light background color */
                color: #333; /* Text color */
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff; /* Container background color */
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h2, h3 {
                color: #333;
                text-align: center; /* Center align heading */
            }
            h5{
                color: #333;
                text-align: center; /* Center align heading */
            }
            p {
                color: #666;
                text-align: center; /* Center align paragraph */
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .product-image {
                text-align: center;
                margin-bottom: 20px;
            }
            .product-image img {
                max-width: 100%;
                height: auto;
            }
            .contact-info {
                margin-top: 20px;
                padding: 10px;
                background-color: #f0f0f0; /* Contact info background color */
                border-radius: 5px;
            }
            </style>
            </head>
            <body>
            <div class="container">
                <!-- Logo -->
                <div class="logo">
                    <img src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png" alt="Logo" style="height: 80px;">
                </div>
                <!-- Alert message -->
                <h2 style="text-decoration: capitalize;">Hello Everyone👋</h2>
                <!-- Auction starting message -->
                <br/>
                <div class="contact-info">
                    <h3 style="text-decoration: capitalize;">The Auction has been started !</h3>
                    <p>Please checkout the auction and Get ready to place your bids!</p>
                    <p>Auction is active till ${localDateTime}</p>
                </div>
                <br/>
                    <h3>Product Details</h3>
                    <div class="contact-info">
                    <p><strong>Product : ${postDetails[0].productname}</strong> </p>
                    <p><strong>Title : ${postDetails[0].adtitle}</strong> </p>
                    <p><strong>Starting Price : ₹ ${data.amountforauction}</strong> </p>
                    <p><strong>Location : ${postDetails[0].location}</strong> </p>
                    <!-- Product image -->
                    <div class="product-image">
                    <img src="${postDetails[0].imageurl[0]}" alt="[Product Title]">
                </div>
            </div>
            </body>
            </html>
            `,
        });
        return res.json({
            status: "success",
            message: "Auction created Successfully !",
            insertdata,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            message: "Auction creatoin error !",
        });
    }
};
module.exports = startauction;
