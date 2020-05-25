import React, { useState } from "react";
import Chats from "./Chats";
import Chat from "./Chat";
import Cards from "../cards/Cards";

const ChatPage = () => {
  // const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [newData, setNewData] = useState();

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
