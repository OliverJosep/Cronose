import React from "react";
import EditUser from "./components/EditUser";
import EditAvatar from "./components/EditAvatar";
import EditDescription from "./components/EditDescription";
import EditPassword from "./components/EditPassword";

const EditProfile = () => {
  return (
    <div className="container edit_profile">
      <h1 className="text-center mt-4">Edit Profile</h1>
      <EditUser />
      <EditAvatar />
      <EditDescription />
      <EditPassword />
    </div>
  );
};

export default EditProfile;
