import express from "express";
import dotnev from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import {app, server} from "./socket/socket.js"

import connectDB from "./db/index.js";

dotnev.config();

const __dirName = path.resolve();
const port = process.env.PORT || 8000;

app.use(express.json());        // will be used to get data from the json
app.use(cookieParser());
    
server.listen(port, (req, res) => {
    connectDB();
    console.log("Server is running on port 8000");
})


app.use("/api/auth", authRoutes);   // will be used for routing   
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirName, "frontend/dist")));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirName, "frontend", "dist", "index.html"));
})
