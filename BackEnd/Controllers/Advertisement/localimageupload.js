const path = require("path");
const localfileUpload = async (req, res) => {
    try {
        const file = req.files["images[]"][1];
        console.log(file);
        const fileName = file.name;
        const fileExtension = fileName.match(/\.(.+)$/)[1]; // Using regular expression
        let temppath = path.join(
            __dirname,
            `../../TempFiles/${Date.now()}.${fileExtension}`
        );
        file.mv(temppath, (err) => {});
        res.json({
            status: "success",
            message: "Local file upload successfully",
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: "error",
            message: "Internal server error at localfileupload",
        });
    }
};

module.exports = localfileUpload;
