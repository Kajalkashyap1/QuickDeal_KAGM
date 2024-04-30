const nodemailer = require("nodemailer");
require("dotenv").config();
const mail = async (req, res) => {
    let recipients = [
        "gaurav9karnor@gmail.com",
        "gouravkarnor@gmail.com",
        "gauravkarnor4@gmail.com",
        "gouravkarnor2509@gmail.com",
    ];
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    console.log(recipients);
    // Create a string of comma-separated email addresses
    let bccList = recipients.join(",");

    // Send the email with the recipients specified in the bcc field
    let info = await transporter.sendMail({
        from: `Quick Deal 😎 <${process.env.MAIL_USER}>`,
        bcc: bccList,
        subject: "Verify Your Email Address with Quick Deal",
        html: `<!DOCTYPE html>
        <html lang="en">
        <!-- Your email content -->
        </html>`,
    });

    return res.json({
        status: "ok",
        message: "mail sent to all ",
    });
};
module.exports = mail;
