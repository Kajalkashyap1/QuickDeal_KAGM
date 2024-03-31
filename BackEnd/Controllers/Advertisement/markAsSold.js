const postdata = require("../../Models/postdata");

const markAsSold = async (req, res) => {
    try {
        const id = req.params.postid;

        // Retrieve the post document
        const post = await postdata.findById(id);

        if (!post) {
            return res.json({
                status: "error",
                message: "Post not found",
            });
        }

        // Flip the value of hasSold
        post.hasSold = !post.hasSold;

        // Save the updated post document
        const updatedPost = await post.save();

        return res.json({
            status: "success",
            message: "Sold updated",
            result: updatedPost,
        });
    } catch (error) {
        console.log("error in Set as sold in server", error.message);
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = markAsSold;
