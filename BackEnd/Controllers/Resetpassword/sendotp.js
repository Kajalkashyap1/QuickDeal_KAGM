const otpdata = require("../../Models/otpschema");
const otpgenerator = require("otp-generator");
const userdata = require("../../Models/userdata");
const validator = require("validator");

function isMNNITEmail(email) {
    return email.endsWith("@mnnit.ac.in") && validator.isEmail(email);
}
function checkpassword(value) {
    return validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });
}

const sendotpResetpass = async (req, res) => {
    try {
        const { email } = req.body;

        if (!isMNNITEmail(email)) {
            return res.json({
                status: "error",
                message: "Invalid email! please use @mnnit.ac.in",
            });
        }
        let checkuser = await userdata.findOne({ email: email });

        if (!checkuser) {
            return res.json({
                status: "error",
                message: "No user found !",
            });
        }
        const otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        });
        const data = {
            otp: otp,
            email: checkuser.email,
            fullname: checkuser.fullname,
        };
        const otps = new otpdata(data);
        const indata = await otps.save();

        return res.json({
            status: "success",
            message: "otp sent to your mail ",
            checkuser,
        });
    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = sendotpResetpass;
