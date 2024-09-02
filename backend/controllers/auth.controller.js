import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try{
        const {fullName, username, password, confirmPassword, gender, profilePicture} = req.body;

        if([fullName,username, password, confirmPassword, gender].some((field) => field?.trim() === "")){
            return res.status(400).json({ error: "Some fields are empty" });
        }

        if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });  // checks if username already exists or not

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

        //encrypting password
        const hashedPassword = await bcrypt.hash(password, 10);

        // API for profile pictures
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
			fullName,
			username,
			password:hashedPassword,
			gender,
			profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
		});

        if (newUser) {
			// Generate JWT token here
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePicture: newUser.profilePicture,
			});
		} else {
			res.status(400).json({ error: "error while creating a user.." });
		}
    }catch(error){
        console.log("Error in signup: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(200).json({error: "Invalid username or password"});
        }

        generateToken(user._id, res);

        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePicture: user.profilePicture,
		});

    } catch (error) {
        console.log("Error in login", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
		res.cookie("jwtToken", "", { maxTimeLimit: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};