const postdata = require("../../Models/postdata");

const DeletePost = async (req, res) => {
    try {
        const id = req.params.postid;
        const deletedPost = await postdata.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.json({
                status: "error",
                message: "Post not found",
            });
        }
        return res.json({
            status: "success",
            message: "Post Deleted",
            result: deletedPost,
        });
    } catch (error) {
        console.log("error in Delete post in server");
        return res.json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = DeletePost;
