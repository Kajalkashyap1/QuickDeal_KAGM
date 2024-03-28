const postdata = require("../../Models/postdata");

const getLikedPosts = async (req, res) => {
    try {
        const userid = req.params.userid;
        const post = await postdata.find({
            likedby: { $in: [userid] },
        });
        return res.json({
            status: "success",
            post,
        });
    } catch (err) {
        console.log("Error in getLikedPosts ", err.message);

        return res.json({
            status: "error",
        });
    }
};
module.exports = getLikedPosts;
