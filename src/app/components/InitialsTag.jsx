import React from "react";

export const InitialsTag = ({ user }) => {
  return (
    <>
      {user.initials}
      <small>#{user.tag}</small>
    </>
  );
};
