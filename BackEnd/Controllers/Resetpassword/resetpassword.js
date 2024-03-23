const userdata = require("../../Models/userdata");
const bcrypt = require("bcryptjs");

const resetpassword = async (req, res) => {
    try {
        const { email, newpassword } = req.body;

        const user = await userdata.findOne({ email: email });
        const flag = await bcrypt.compare(newpassword, user.password);
        if (flag) {
            return res.json({
                status: "error",
                message: "Password same as Previous ",
            });
        }
        const Npassword = await bcrypt.hash(newpassword, 12);
        const insertdata = await userdata.updateOne(
            { email: email },
            { $set: { password: Npassword } }
        );
        return res.json({
            status: "success",
            message: "Password reset Successfully !",
        });
    } catch (e) {
        console.log("error while updating password in reset password ");
        console.log(e.message);
    }
};
module.exports = resetpassword;
