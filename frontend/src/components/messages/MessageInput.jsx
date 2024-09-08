import React, { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { MdPermMedia } from "react-icons/md";
import useSendMessage from "../../hooks/useSendMessage.js";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
		<form className="flex gap-2 px-4 my-3" onSubmit={handleSubmit}>
		<div className="w-full relative">
			<input
			type="text"
			className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
			placeholder="Send a message"
			value={message}
			onChange={(e) => setMessage(e.target.value)}
			/>
			<button
			type="submit"
			className="absolute inset-y-0 end-0 flex items-center pe-3"
			>
			{loading ? (
				<div className="loading loading-spinner"></div>
			) : (
				<BsSend />
			)}
			</button>
		</div>
		{/* <div className="flex justify-center items-center">
			<button
			type="submit"
			className="inset-y-0 end-0 flex items-center pr-0"
			>
			{loading ? (
				<div className="loading loading-spinner"></div>
			) : (
				<MdPermMedia
				size={24}
				cursor={"pointer"}
				onClick={() => imageRef.current.click()}
				/>
			)}
			</button>
			<input type="file" ref={imageRef} className="hidden" onClick={handleOpenModal}/>
		</div> */}
		</form>

	);
};

export default MessageInput;
