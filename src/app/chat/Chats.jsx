import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import UserAvatar from "../components/Avatar";
import Name from "../components/Name";
import { LocaleContext } from "../../contexts/LocaleContext";

const Chats = ({ selectedChat, setSelectedChat, newData, setNewData }) => {
  const context = useContext(LocaleContext);
  const [chats, setChats] = useState();

  useEffect(() => {
    const getChats = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/chats/${context.user.id}`,
        { params: { jwt: context.jwt } }
      );
      setChats(response.data);
    };

    const interval = setInterval(() => {
      getChats();
    }, 3000);

    getChats();
    setNewData(false);

    return () => clearInterval(interval);
  }, [context.user, context.jwt, newData, setNewData]);

  return (
    <div className="chats col-4 col-xl-3 p-1" id="user-chat">
      <div className="bg">
        {chats &&
          chats.map((chat, index) => (
            <div
              className={
                "user-chat " +
                (selectedChat === chat.receiver.id ? " active" : "")
              }
              onClick={() => setSelectedChat(chat.receiver.id)}
              key={chat.receiver.id}
            >
              <div className={"user-box p-2 "}>
                <UserAvatar
                  name={chat.receiver.full_name}
                  avatar={chat.receiver.avatar}
                  size={55}
                />
                <div className="row">
                  <div className="col-12 d-none d-md-block user">
                    <Name user={chat.receiver} />
                  </div>
                  <small className="d-none d-md-block message">
                    {chat.last.message}
                  </small>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chats;
