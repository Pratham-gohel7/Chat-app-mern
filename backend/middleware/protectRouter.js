import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRouter = async (req, res, next) => {
    try {
        const token = req.cookies?.jwtToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({message: "You are not logged in!"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Invalid token!"});
        }

        const user = await User.findById(decoded.userID).select("-password");

        if(!user){
            return res.status(401).json({message: "User not found!"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protect Route", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
};


export default protectRouter;