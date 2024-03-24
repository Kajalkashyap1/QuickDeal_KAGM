const userdata = require("../../Models/userdata");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const optdata = require("../../Models/otpschema");

const register = async (req, res) => {
    let fullname;
    let email;
    let Npassword;
    let contactNo;
    var isGooglelogin = false;
    let imageurl = "";
    let inputotp;
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
        contactNo = req.body.contactNo;
        inputotp = req.body.inputotp;
    }

    // if (!req.body.isgoogle && !checkpassword(Npassword)) {
    //     return res.json({
    //         status: "error",
    //         message: "Password does not meet the criteria",
    //     });
    // }
    // else if (!req.body.isgoogle && !checknumber(contactNo)) {
    //     return res.json({
    //         status: "error",
    //         message: "Please enter valid Number",
    //     });
    // }

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
    }
    const password = await bcrypt.hash(Npassword, 12);
    const data = {
        isGooglelogin,
        fullname,
        email,
        contactNo,
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
        let error;
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
