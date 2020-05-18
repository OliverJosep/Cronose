import React from "react";
import Avatar from "react-avatar";

export default function UserAvatar(props) {
  if (props.avatar.visible === "1")
    return (
      <Avatar
        src={`${process.env.REACT_APP_API_URL}/images/${props.avatar.url}`}
        size={props.size}
        round={true}
        className="mr-2"
      />
    );
  return (
    <>
      <Avatar
        name={props.name}
        size={props.size}
        round={true}
        className="mr-2"
      />
    </>
  );
}
