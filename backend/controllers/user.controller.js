import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserID = req.user?._id;
        const allUsersExceptMe = await User.find({ _id: { $ne: loggedInUserID } }).select("-password");

        res.status(200).json(allUsersExceptMe);
    } catch (error) {
        console.log("Error in getuser controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}