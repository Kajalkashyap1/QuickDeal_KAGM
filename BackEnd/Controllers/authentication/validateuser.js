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
const validateuser = async (req, res) => {
    try {
        const { email, role, password, cnfpassword, isgoogle } = req.body;

        const result = await userdata.find({ email });
        if (isgoogle && result.length > 0) {
            return res.send({
                status: "login only",
                message: "user Already Registerd",
            });
        } else if (isgoogle) {
            return res.json({
                status: "Google login ok",
                message: "user not registerd",
            });
        }
        if (!isgoogle && result.length > 0) {
            return res.send({
                status: "error",
                message: "user Already Registerd",
            });
        }
        if (!isMNNITEmail(email)) {
            return res.json({
                status: "error",
                message: "Invalid Email ! use @MNNIT.ac.in",
            });
        }

        if (cnfpassword != password) {
            return res.json({
                status: "error",
                message: "Password did not matched!",
            });
        }
        if (!checkpassword(password)) {
            return res.json({
                status: "error",
                message: "Please enter strong password",
            });
        }

        res.json({
            status: "success",
            message: "Data is ok",
        });
    } catch (error) {
        console.log("erro in validateuser ", error.message);
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = validateuser;
