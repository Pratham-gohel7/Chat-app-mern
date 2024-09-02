import { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton.jsx";
import Message from "./Message.jsx";
import useListenMessages from "../../hooks/useListenMessages.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import Conversation from "../../../../backend/models/conversation.model.js";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const [seenStatus, setSeenStatus] = useState(false);
	const {authUser} = useAuthContext();
	const {socket} = useSocketContext();
	const {selectedConversation, setMessages, message} = useConversation()
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	useEffect(() => {
		const lastMessageIsFomUser = messages.length && messages[messages.length - 1].senderID !== authUser._id;
		if(lastMessageIsFomUser){
			socket.emit("markMessageAsSeen", {
				conversationID: selectedConversation._id,
				userID: authUser._id
			})
		}

		socket.on("messagesSeen", ({conversationID}) => {
			if(selectedConversation._id === conversationID){
				setMessages(prev => {
					const updateMessages = prev.map(message => {
						if(!message.seen){
							setSeenStatus(true);
							return {...message, seen:true}
						}
						return message
					})
					return updateMessages
				})
			}
		})
	}, [socket, authUser._id, messages, selectedConversation])

	return (
		<div className='px-4 flex-1 overflow-auto md:[300px]'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} seen={seenStatus}/>
					</div>
			))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;