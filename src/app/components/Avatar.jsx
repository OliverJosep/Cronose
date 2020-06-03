import React from "react";
import Avatar from "react-avatar";

const UserAvatar = ({ avatar, name, size }) => {
  if ((avatar === null || name === null) && size !== null) {
    return (
      <Avatar
        src="/assets/img/avatar-placeholder.png"
        size={size}
        round={true}
        className="mr-2"
      />
    );
  }
  if (avatar.visible === "1")
    return (
      <Avatar
        src={`${process.env.REACT_APP_API_URL}/images/${avatar.url}${avatar.extension}`}
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
