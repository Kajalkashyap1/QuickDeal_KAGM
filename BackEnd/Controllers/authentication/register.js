const userdata = require("../../Models/userdata");
const bcrypt = require("bcryptjs");
const validator = require("validator");

function checkpassword(value) {
    return validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });
}

const register = async (req, res) => {
    let fullname;
    let email;
    let Npassword;
    let contactNo;
    if (req.body.isgoogle) {
        fullname = req.body.value.name;
        email = req.body.value.email;
        Npassword = "Google@#231";
        contactNo = 99999999999;
    } else {
        fullname = req.body.fullname;
        email = req.body.email;
        Npassword = req.body.password;
        contactNo = req.body.contactNo;
    }
    if (!checkpassword(Npassword)) {
        return res.json({
            status: "error",
            message: "Password does not meet the criteria",
        });
    }
    const password = await bcrypt.hash(Npassword, 12);
    const data = { fullname, email, contactNo, password };
    const insertdata = new userdata(data);
    try {
        const indata = await insertdata.save();
        return res.json({
            status: "success",
            message: "User created",
        });
    } catch (e) {
        let error;
        if (e.keyPattern != undefined) {
            error = Object.keys(e.keyPattern)[0] + " already exists !";
        } else {
            const errortarget = Object.keys(e.errors)[0];
            error = e.errors[errortarget].message;
        }
        return res.json({
            status: "error",
            message: error,
        });
    }
};
module.exports = register;
