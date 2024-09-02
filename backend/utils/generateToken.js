import jwt from "jsonwebtoken";

const generateToken = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,         // stops people to access it from js
        secure: true     
    })
};

export default generateToken;