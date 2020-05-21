import React from "react";
import Avatar from "react-avatar";

const UserAvatar = ({ avatar, name, size }) => {
  if (avatar.visible === "1")
    return (
      <Avatar
        src={`${process.env.REACT_APP_API_URL}/images/${avatar.url}`}
        size={size}
        round={true}
        className="mr-2"
      />
    );
  return (
    <>
      <Avatar name={name} size={size} round={true} className="mr-2" />
    </>
  );
};
export default UserAvatar;
