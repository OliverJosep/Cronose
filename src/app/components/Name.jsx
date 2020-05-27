import React from "react";

const Name = ({ user }) => {
  return <>{user.name ? user.full_name : <InitialsTag user={user} />}</>;
};

const InitialsTag = ({ user }) => {
  return (
    <>
      {user.initials}
      <small>#{user.tag}</small>
    </>
  );
};

export default Name;
