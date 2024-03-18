const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer");
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
        default: Date.now(),
        expires: 5 * 60,
    },
});

otpschema.pre("save", async function (next) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: this.email,
            subject: "One Time Password(OTP)",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #333;
                }
                p {
                    color: #555;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    margin-bottom: 20px;
                }
                .note {
                    color: #888;
                    font-size: 14px;
                    margin-top: 20px;
                }
            </style>
            </head>
            <body>
                <div class="container">
                    <h2>One Time Password (OTP) Verification</h2>
                    <p>Please use the following OTP to verify your email:</p>
                    <div class="otp">Your OTP: <span>${this.otp}</span></div>
                    <p class="note">Note: This OTP is valid for 5 minutes and should not be shared with anyone.</p>
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
