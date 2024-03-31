const postdata = require("../../Models/postdata");

const updatePost = async (req, res) => {
    try {
        const postId = req.params.postid;
        const newData = req.body;
        const updatedPost = await postdata.findByIdAndUpdate(postId, newData, {
            new: true,
        });
        if (!updatedPost) {
            return res.json({
                status: "error",
                message: "Post not found",
            });
        }

        return res.json({
            status: "success",
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        console.log("Error in Update post in server:", error);
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
};

module.exports = updatePost;
