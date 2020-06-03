import React from "react";

const Name = ({ user }) => {
  return (
    <>{user.name ? <FullName user={user} /> : <InitialsTag user={user} />}</>
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

const FullName = ({ user }) => {
  return (
    <>
      {user.full_name}
      <small>#{user.tag}</small>
    </>
  );
};

export default Name;
