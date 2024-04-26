const AuctionProduct = require("../../Models/auctionproduct");
const BidAmount = require("../../Models/BidAmount");
const postdata = require("../../Models/postdata");
const nodemailer = require("nodemailer");
const endAuction = async (req, res) => {
    try {
        const { auctionid } = req.body;
        // Set activetill field to a past time (e.g., current time minus 1 hour)
        const pastTime = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago
        const updatedAuction = await AuctionProduct.findByIdAndUpdate(
            auctionid,
            { $set: { activetill: pastTime } },
            { new: true } // Return the updated document
        );

        if (!updatedAuction) {
            return res.json({
                status: "error",
                message: "Auction not found",
            });
        }
        const maxBID = await BidAmount.findOne(
            { auctionid: auctionid },
            {},
            { sort: { amount: -1 } }
        )
            .populate("senderId")
            .populate("auctionid");
        // -------- finding product details --------
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        if (maxBID) {
            const productdetails = await postdata.findOne({
                _id: maxBID.auctionid.productid,
            });
            const buyerName = maxBID.senderId.fullname;
            const buyerEmail = maxBID.senderId.email;
            const amount = maxBID.amount;
            const productImageurl = productdetails.imageurl[0];
            const productOwnername = productdetails.username;
            const productOwnerEmail = productdetails.useremail;
            const productTitle = productdetails.adtitle;
            const productName = productdetails.productname;
            const location = productdetails.location;
            // ---------------- sending to buyer -------------
            let info = await transporter.sendMail({
                from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
                to: buyerEmail,
                subject: "Auction results",
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
                    <!-- Congratulations message -->
                    <h2 style="text-decoration: capitalize;">Hello, ${buyerName}👋 Congratulations! 🎉</h2>
                    <h3>You've won the auction!</h3>
                    <!-- Auction description -->
                    <br/>
                    <p>You can contact the owner of the product</p>
                    <!-- Owner info -->
                    <div class="contact-info">
                    <p><strong>Owner Contact Information:</strong></p>
                    <p>Name: ${productOwnername}</p>
                    <p>Email: ${productOwnerEmail}</p>
                    </div>
                    <br/>
                    <h5>You gave an offer of ₹ ${amount}/- for the auction.</h5>
                    <!-- Product details -->
                    <br/>
                    <h3>Product Details</h3>
                    <div class="contact-info">
                    <p><strong>Product :</strong> ${productName}</p>
                    <p><strong>Title :</strong> ${productTitle}</p>
                    <p><strong>Location :</strong> ${location}</p>
                    <!-- Product image -->
                    <div class="product-image">
                    <img src="${productImageurl}" alt="[Product Title]">
                    </div>
                    </div>
                    </div>
                    </body>
                    </html>
                    `,
            });
            // ---------------- sending to seller -------------
            let info3 = await transporter.sendMail({
                from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
                to: productOwnerEmail,
                subject: "Auction results",
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
                    <!-- Congratulations message -->
                    <h2 style="text-decoration: capitalize;">Hello, ${productOwnername}👋</h2>
                    <!-- Auction description -->
                    <br/>
                    <p>You can contact the Buyer</p>
                    <!-- Owner info -->
                    <div class="contact-info">
                    <p><strong>Buyer's Contact Information:</strong></p>
                    <p>Name: ${buyerName}</p>
                    <p>Email: ${buyerEmail}</p>
                    </div>
                    <br/>
                    <h5> ${buyerName} gave an offer of ₹ ${amount}/- for the auction.</h5>
                    <!-- Product details -->
                    <br/>
                    <h3>Product Details</h3>
                    <div class="contact-info">
                    <p><strong>Product :</strong> ${productName}</p>
                    <p><strong>Title :</strong> ${productTitle}</p>
                    <p><strong>Location :</strong> ${location}</p>
                    <!-- Product image -->
                    <div class="product-image">
                    <img src="${productImageurl}" alt="[Product Title]">
                    </div>
                    </div>
                    </div>
                    </body>
                    </html>
                    `,
            });
        } else {
            const data = await AuctionProduct.findOne({
                _id: auctionid,
            }).populate("productid");
            console.log(data);
            const productImageurl = data.productid.imageurl[0];
            const productOwnername = data.productid.username;
            const productOwnerEmail = data.productid.useremail;
            const productTitle = data.productid.adtitle;
            const productName = data.productid.productname;
            const location = data.productid.location;
            let info3 = await transporter.sendMail({
                from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
                to: productOwnerEmail,
                subject: "Auction results",
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
                    <!-- Congratulations message -->
                    <h2 style="text-decoration: capitalize;">Hello, ${productOwnername}👋</h2>
                    <!-- Auction description -->
                    <br/>
                    <!-- Owner info -->
                    <div class="contact-info">
                    <p><strong>Nobody gave any Offer for the product in auction !</strong></p>
                    </div>
                    </div>
                    </body>
                    </html>
                    `,
            });
        }
        return res.json({
            status: "success",
            message: "Auction ended successfully",
            updatedAuction,
        });
    } catch (error) {
        console.log("Error in endAuction:", error);
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
};

module.exports = endAuction;
