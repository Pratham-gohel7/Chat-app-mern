import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import useConversation from "../../zustand/useConversation.js";

export const Home = () => {
  const {selectedConversation} = useConversation();

  return (
    <div className="flex md:h-[550px] h-[520px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar visibility={`${selectedConversation ? "hidden" : ""}`}/>
      <MessageContainer visibility={`${selectedConversation ? "" : "hidden"}`}/>
    </div>
  );
};
export default Home;
