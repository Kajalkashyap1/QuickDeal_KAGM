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

function checknumber(value) {
    const val = value.toString().length;
    return val >= 10;
}

const sendotp = async (req, res) => {
    try {
        const { email, contactNo, password, cnfpassword } = req.body;

        const result = await userdata.find({ email });
        if (result.length > 0) {
            return res.send({
                status: "error",
                message: "user Already Registerd",
            });
        }
        if (!checknumber(contactNo)) {
            return res.send({
                status: "error",
                message: "Enter a valid Number",
            });
        }
        if (!isMNNITEmail(email)) {
            return res.send({
                status: "error",
                message: "Invalid Email ! use @MNNIT.ac.in",
            });
        }
        if (!checkpassword(password)) {
            return res.send({
                status: "error",
                message: "Please enter strong password",
            });
        }
        if (cnfpassword != password) {
            return res.send({
                status: "error",
                message: "Password did not matched",
            });
        }
        const otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        });
        const data = { otp: otp, email: email };
        const otps = new otpdata(data);
        const indata = await otps.save();
        res.json({
            status: "success",
            message: "otp sent and saved in DB",
        });
    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = sendotp;
