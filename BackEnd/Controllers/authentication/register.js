const userdata = require("../../Models/userdata");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const optdata = require("../../Models/otpschema");

const register = async (req, res) => {
    let fullname;
    let email;
    let Npassword;
    var isGooglelogin = false;
    let imageurl = "";
    let inputotp;
    let role = "";
    if (req.body.isgoogle) {
        fullname = req.body.fullname;
        email = req.body.email;
        Npassword = "GHghghhghhasghsgahsg##@#@#@$@@$%3213216546546546";
        isGooglelogin = true;
        imageurl = req.body.picture;
        inputotp = req.body.inputotp;
    } else {
        fullname = req.body.fullname;
        email = req.body.email;
        Npassword = req.body.password;
        role = req.body.role;
        inputotp = req.body.inputotp;
        imageurl = `https://res.cloudinary.com/dsaaqhang/image/upload/v1711527687/QuickDeal/user_hl1hcs.png`;
    }

    if (!isGooglelogin) {
        const otpvalues = await optdata.findOne({ email: email });
        if (!otpvalues) {
            return res.json({
                status: "error",
                message: "OTP expired",
            });
        }

        const otp = otpvalues.otp.toString();
        const emailid = otpvalues.email;
        if (otp != inputotp) {
            return res.json({
                status: "error",
                message: "Invalid OTP !",
            });
        }
    } else {
        const val = await userdata.findOne({ email: email });
        if (val) {
            return res.json({
                status: "success",
                message: "Already Registered ",
            });
        }
    }
    const password = await bcrypt.hash(Npassword, 12);
    const data = {
        isGooglelogin,
        fullname,
        email,
        role,
        password,
        imageurl,
    };
    const insertdata = new userdata(data);
    try {
        const indata = await insertdata.save();
        return res.json({
            status: "success",
            message: "Registered succssfully ! Login now",
        });
    } catch (e) {
        console.log(e.message);
        let error = "";
        if (e.keyPattern != undefined) {
            error = Object.keys(e.keyPattern)[0] + " already exists !";
            error = error.charAt(0).toUpperCase() + error.slice(1);
        } else {
            const errortarget = Object.keys(e.errors)[0];
            error = e.errors[errortarget].message;
            error = error.charAt(0).toUpperCase() + error.slice(1);
        }
        return res.json({
            status: "error",
            message: error,
        });
    }
};
module.exports = register;
