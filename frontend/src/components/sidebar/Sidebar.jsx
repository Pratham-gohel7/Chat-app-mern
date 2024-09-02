import React from "react";
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import useConversation from "../../zustand/useConversation.js";

const Sidebar = ({visibility}) => {
  return (
    <div className={`md:border-r border-slate-500 p-4 md:flex md:flex-col ${visibility} flex flex-col`}>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations/>
      <LogoutButton/>
    </div>
  );
};

export default Sidebar;
