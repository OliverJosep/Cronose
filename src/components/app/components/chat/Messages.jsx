import React from "react";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../../layouts/Avatar";

export const RenderChat = ({ user, messages }) => {
  return (
    <div className="messages mb-2">
      <div className="user p-2">
        <UserAvatar name={user.full_name} avatar={user.avatar} size={40} />
        <NavLink to={`/profile/${user.initials}/${user.tag}`}>
          <span className="name">
            {user.full_name ? user.full_name : <InitialsTag user={user} />}
          </span>
        </NavLink>
      </div>
      <div className="mt-1 scroll" id="chat_box">
        {messages
          ? messages.map((message, index) => (
              <Message
                sended={message.sended}
                message={message.message}
                date={message.sended_date}
                key={index}
              />
            ))
          : "Loading"}
      </div>
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

export const RenderChats = ({
  user,
  selected,
  selectChat,
  chatsLength,
  message,
}) => {
  return (
    <div
      className={"user-chat" + (selected === user.id ? " active" : "")}
      id={user.id}
      onClick={selectChat}
    >
      <div className={"user-box p-2 "}>
        <UserAvatar name={user.full_name} avatar={user.avatar} size={55} />
        <div className="row">
          <div className="col-12 d-none d-md-block user">
            {user.full_name ? user.name : <InitialsTag user={user} />}
          </div>
          <small className="d-none d-md-block message">
            {message.message.substring(0, chatsLength)}
            {message.message.length > chatsLength && "..."}
          </small>
        </div>
      </div>
    </div>
  );
};

const InitialsTag = ({ user }) => {
  return (
    <>
      {user.initials}
      <small>#{user.tag}</small>
    </>
  );
};
