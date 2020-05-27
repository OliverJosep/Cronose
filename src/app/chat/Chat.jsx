import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import { NavLink } from "react-router-dom";
import UserAvatar from "../components/Avatar";
import Name from "../components/Name";
import qs from "qs";

const Chat = ({ selectedChat, setNewData }) => {
  const context = useContext(LocaleContext);
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();
  const [scrollDown, setScrollDown] = useState();

  useEffect(() => {
    // Get chat
    const getChat = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/chat/${context.user.id}/${selectedChat}`,
        { params: { jwt: context.jwt } }
      );
      setReceiver(response.data.receiver);
      setMessages(response.data.messages);
      setScrollDown(true);
    };

    selectedChat && getChat();
  }, [selectedChat, context.user, context.jwt]);

  useEffect(() => {
    // Get las messages
    const getLastMessage = async () => {
      if (selectedChat) {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/chat/last/${context.user.id}/${selectedChat}`,
          { params: { jwt: context.jwt } }
        );
        if (messages) {
          for (let i = 0; i < response.data.messages.length; i++) {
            if (
              response.data.messages[i].sended_date >
              messages[messages.length - 1].sended_date
            ) {
              setMessages((messages) => [
                ...messages,
                response.data.messages[i],
              ]);
              setScrollDown(true);
            }
          }
        }
      }
    };

    // getLastMessage();
    // const interval = setInterval(() => {
    //   selectedChat && getLastMessage();
    // }, 2000);

    // return () => clearInterval(interval);
  }, [context.user, context.jwt, selectedChat, messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("send").value = "";
    if (!message || message.trim() === "") return;
    const list = messages;
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    const newMessage = {
      sended: "1",
      sended_date: date,
      message: message,
      jwt: context.jwt,
    };
    Axios.post(
      `${process.env.REACT_APP_API_URL}/chat/${context.user.id}/${selectedChat}`,
      qs.stringify(newMessage)
    );
    list.push(newMessage);
    setMessages(list);
    setMessage();
    setScrollDown(true);
    setNewData(true);
  };

  useEffect(() => {
    const scrollDown = () => {
      var objDiv = document.getElementById("chat_box");
      objDiv.scrollTop = objDiv.scrollHeight;
      setScrollDown(false);
    };
    scrollDown();
  }, [scrollDown]);

  return (
    <div className="chat col-xl-6 col-8 p-1">
      <div className="messages mb-2">
        <div className="user p-2">
          <UserAvatar
            name={receiver ? receiver.full_name : null}
            avatar={receiver ? receiver.avatar : null}
            size={50}
          />
          <NavLink
            to={
              receiver
                ? "/profile/" + receiver.initials + "/" + receiver.tag
                : "#"
            }
          >
            <span className="name">
              {receiver ? <Name user={receiver} /> : "Select User"}
            </span>
          </NavLink>
        </div>
        <div className="mt-1 scroll" id="chat_box">
          {messages &&
            messages.map((message, index) => (
              <Message
                sended={message.sended}
                message={message.message}
                date={message.sended_date}
                key={index}
              />
            ))}
        </div>
      </div>
      <form
        id="send_message"
        method="post"
        target="_self"
        className="w-100 row"
        onSubmit={handleSubmit}
      >
        <div className="pr-1 col-xl-10 col-8">
          <input
            id="send"
            onChange={({ target }) => setMessage(target.value)}
            autoComplete="off"
            className="form-control"
            type="text"
            placeholder="Insert message here!"
          />
        </div>
        <div className="pl-1 col-xl-2 col-4">
          <input
            className="btn w-100 text-white"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

const Message = ({ sended, message, date }) => {
  return (
    <div
      className={
        "ml-3 mb-2 card rounded w-75 " +
        (sended === "1" ? "sender float-right" : "reciever float-left")
      }
    >
      <div className="card-body p-2">
        <p className="card-text black-text message"> {message} </p>
        <div className="date">{date.substring(11, 16)}</div>
      </div>
    </div>
  );
};

export default Chat;
