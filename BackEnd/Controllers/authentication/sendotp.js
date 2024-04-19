const otpdata = require("../../Models/otpschema");
const otpgenerator = require("otp-generator");
const userdata = require("../../Models/userdata");
const validator = require("validator");

const sendotp = async (req, res) => {
    try {
        const { email, isgoogle, fullname } = req.body;

        if (isgoogle) {
            let checkuser = await userdata.findOne({ email: email });
            if (checkuser) {
                return res.json({
                    status: "error",
                    message: "Google id already registered",
                });
            }
        }

        // const result = await userdata.find({ email });
        // if (result.length > 0) {
        //     return res.send({
        //         status: "error",
        //         message: "user Already Registerd",
        //     });
        // }
        // if (!checknumber(contactNo)) {
        //     return res.send({
        //         status: "error",
        //         message: "Enter a valid Number",
        //     });
        // }
        // if (!isMNNITEmail(email)) {
        //     return res.send({
        //         status: "error",
        //         message: "Invalid Email ! use @MNNIT.ac.in",
        //     });
        // }
        // if (!checkpassword(password)) {
        //     return res.send({
        //         status: "error",
        //         message: "Please enter strong password",
        //     });
        // }
        // if (cnfpassword != password) {
        //     return res.send({
        //         status: "error",
        //         message: "Password did not matched",
        //     });
        // }
        const otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        });
        const data = { otp: otp, email: email, fullname };
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
