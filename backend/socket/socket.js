import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000", "http://localhost:8000", "https://chat-app-mern-1-u62c.onrender.com/"],
		methods: ["GET", "POST"]
	}
})

export const getReceiverSocektID = (receiverID) => {
	return userSocketMap[receiverID];
}

const userSocketMap = {};

io.on('connection', (socket) => {
	console.log(`a user is connected at ${socket.id}`);
	
	
	const userID = socket.handshake.query.userID;

	if(userID){
		userSocketMap[userID] = socket.id;
	}

	// io.emit() is used to send the events to all the users.
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("markMessageAsSeen", async ({conversationID, userID}) => {
		try {
			await Message.updateMany({conversationID: conversationID, seen: false}, {$set:{seen:true}});
			io.to(userSocketMap[userID]).emit("messagesSeen", {conversationID});
		} catch (error) {
			console.log(error);
		}
	})
	
	//it is used to listen to the events from both the client as well as server.
	socket.on("disconnect", () => {
		console.log(`a user is disconnected ${socket.id}`);
		delete userSocketMap[userID];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	})
})

export {app, server, io};