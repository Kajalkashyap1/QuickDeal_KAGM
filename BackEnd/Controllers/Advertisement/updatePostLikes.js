const userdata = require("../../Models/userdata");
const postdata = require("../../Models/postdata");

const updatePostLikes = async (req, res) => {
    try {
        const { postid, userid } = req.params;
        const post = await postdata.findOne({ _id: postid });
        if (post.likedby.includes(userid)) {
            // If user already liked the post, remove user from likedby array
            post.likedby.pull(userid);
            await post.save();
            return res.json({
                status: "success",
                message: "Post unliked successfully",
            });
        } else {
            // If user hasn't liked the post, add user to likedby array
            post.likedby.push(userid);
            await post.save();
            return res.json({
                status: "success",
                message: "Post liked successfully",
            });
        }
    } catch (error) {
        console.log("Erro in updating Likes in server", error.message);
        return res.json({
            status: "error",
            message: "error in updating Likes in server ",
        });
    }
};
module.exports = updatePostLikes;
