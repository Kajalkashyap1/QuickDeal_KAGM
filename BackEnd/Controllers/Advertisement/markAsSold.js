const postdata = require("../../Models/postdata");

const markAsSold = async (req, res) => {
    try {
        const id = req.params.postid;
        const updatedPost = await postdata.findByIdAndUpdate(
            id,
            { hasSold: true },
            { new: true }
        );
        if (!updatedPost) {
            return res.json({
                status: "error",
                message: "Post not found",
            });
        }
        return res.json({
            status: "success",
            message: "Sold updated",
            result: updatedPost,
        });
    } catch (error) {
        console.log("error in Set as sold in server");
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = markAsSold;
