import User from "../models/user.model.js";

export const getUser = async(req, res, next) => {
    try {
        console.log(req.body)
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUser }
        }).select("-password")
        res.status(200).json(filteredUsers)



    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}