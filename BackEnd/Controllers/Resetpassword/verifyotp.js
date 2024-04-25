const otpdata = require("../../Models/otpschema");
const otpgenerator = require("otp-generator");
const userdata = require("../../Models/userdata");
const validator = require("validator");

const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        let otpval = await otpdata.findOne(
            { email: email },
            {},
            { sort: { generationtime: -1 } }
        );
        if (!otpval) {
            return res.json({
                status: "error",
                message: "OTP expired ! please resend it ",
            });
        }
        const realotp = otpval.otp.toString();
        if (realotp !== otp) {
            return res.json({
                status: "error",
                message: "Invalid OTP !",
            });
        } else if (realotp === otp) {
            return res.json({
                status: "success",
                message: "OTP verified succesfully !",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = verifyotp;
