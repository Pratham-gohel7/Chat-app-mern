import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		conversationID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Conversation"
		},
		message: {
			type: String,
			required: true,
		},
		seen: {
			type: Boolean,
			default: false,
		}
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;