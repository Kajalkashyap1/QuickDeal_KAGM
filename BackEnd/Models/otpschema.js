const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const next = require("next");

require("dotenv").config();

const otpschema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: Number,
    },
    generationtime: {
        type: Date,
        default: Date.now,
        expires: "300s",
    },
    fullname: {
        type: String,
    },
});

otpschema.pre("save", async function (next) {
    try {
        // -----------------this is using Oauth google ---------------

        // const oauth2client = new google.auth.OAuth2(
        //     process.env.SENDMAIL_CLIENTID,
        //     process.env.SENDMAIL_CLIENTSECRET,
        //     process.env.SENDMAIL_REDIRECTURL
        // );
        // oauth2client.setCredentials({
        //     refresh_token: process.env.SENDMAIL_REFRESHTOKEN,
        // });

        // const access_token = await oauth2client.getAccessToken();

        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         type: "OAuth2",
        //         user: "gauravkarnor4@gmail.com",
        //         clientSecret: process.env.SENDMAIL_CLIENTSECRET,
        //         clientId: process.env.SENDMAIL_CLIENTID,
        //         refreshToken: process.env.SENDMAIL_REFRESHTOKEN,
        //         accessToken: access_token,
        //     },
        // });

        // -----------------this is using Oauth google ---------------

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
            to: this.email,
            subject: "Verify Your Email Address with Quick Deal",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #1a1a1a; /* Dark background color */
                    color: #fff; /* Text color */
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #333; /* Container background color */
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
                }
                h2, h3 {
                    color: #fff;
                    text-align: center; /* Center align heading */
                }
                p {
                    color: #ccc;
                    text-align: center; /* Center align paragraph */
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    text-align: center; /* Center align OTP */
                }
                .note {
                    color: #888;
                    font-size: 14px;
                    text-align: center; /* Center align note */
                }
                .logo {
                    text-align: center;
                    margin-bottom: 20px;
                }
            </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dsaaqhang/image/upload/v1711003867/QuickDeal/onlinelogomaker-022024-0033-5725_u3lk5k.png" alt="Logo" style="height: 80px;">
                    </div>
                    <h2>Hello👋, ${this.fullname} </h2>
                    <h3>Verify your email Address</h3>
                    <p>Please use the following verification code to verify your email</p>
                    <div class="otp">Code: <span>${this.otp}</span></div>
                    <p class="note">Note: This OTP is important for your account security. Please ensure to use it within 5 minutes of receipt and do not share it with anyone.</p>
                </div>
            </body>
            </html>`,
        });
    } catch (error) {
        console.log(error);
    }
    next();
});

const otpdata = new mongoose.model("otpdata", otpschema);

module.exports = otpdata;
