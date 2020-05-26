import React, { useState, useEffect } from "react";
import Chats from "./Chats";
import Chat from "./Chat";
import Cards from "../cards/Cards";

const ChatPage = () => {
  // const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [newData, setNewData] = useState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("id")) setSelectedChat(params.get("id"));
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Chat</h1>
      <div className="container-fluid ">
        <div className="row card-chat mb-4">
          <Chats
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            setNewData={setNewData}
            newData={newData}
          />
          <Chat selectedChat={selectedChat} setNewData={setNewData} />
          <Cards selectedChat={selectedChat} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
