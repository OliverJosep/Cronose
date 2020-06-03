import React, { useState, useContext } from "react";
import UserAvatar from "../../components/Avatar";
import Avatar from "react-avatar";
import { LocaleContext } from "../../../contexts/LocaleContext";
import Axios from "axios";

const EditAvatar = () => {
  const { user, jwt, updateUser } = useContext(LocaleContext);

  const [url, setUrl] = useState();

  const showFileSize = (event) => {
    const maxSize = 1048576; // 1 MB
    const file = event.target.files[0];
    if (isValid(file, maxSize) === true)
      return setUrl(URL.createObjectURL(file));
    document.getElementById("avatar").value = null;
    setUrl(null);
  };

  const isValid = (img, size) => {
    if (!img) return;
    if (!img.type.match("image/jpeg") && !img.type.match("image/png"))
      return "Invalid image";
    if (size < img.size) return "Max 1 MB";
    return true;
  };

  const updateAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let visible = formData.get("visible") ? "1" : "0";
    formData.delete("visible");
    if (visible !== user.avatar.visible) toggleAvatar(visible);
    if (formData.get("avatar").name === "") return;
    formData.set("media_id", user.avatar.id);
    formData.set("user_initials", user.initials);
    formData.set("user_tag", user.tag);
    formData.set("user_id", user.id);
    formData.set("jwt", jwt);
    Axios.post(
      `${process.env.REACT_APP_API_URL}/user/avatar/update`,
      formData
    ).then(() => {
      window.location.reload(false);
    });
  };

  const toggleAvatar = (visible) => {
    let formData = new FormData();
    formData.set("media_id", user.avatar.id);
    formData.set("visible", visible);
    formData.set("user_id", user.id);
    formData.set("jwt", jwt);
    Axios.post(
      `${process.env.REACT_APP_API_URL}/user/avatar/visible`,
      formData
    ).then(() => {
      updateUser(user.id);
    });
  };

  return (
    <div className="mt-4 box">
      <div className="title p-2">
        Avatar |{" "}
        <span className="user">
          {user.initials}#<span className="text-muted">{user.tag}</span>
        </span>
      </div>
      <div className="body">
        <form
          id="avatar_form"
          method="post"
          target="_self"
          className="form-signin text-center pt-3"
          onSubmit={updateAvatar}
        >
          <div>
            {url ? (
              <Avatar src={url} size={100} round={true} className="mr-2" />
            ) : (
              <UserAvatar
                name={user.full_name}
                avatar={user.avatar}
                size={100}
              />
            )}
          </div>
          <input
            id="avatar"
            type="file"
            name="avatar"
            className="mt-3"
            onChange={(event) => showFileSize(event)}
            style={{ width: "250px" }}
          />
          <br />
          <label className="mt-2" htmlFor="visible">
            Visible
          </label>
          <input
            className="ml-2 mt-3"
            id="visible"
            name="visible"
            defaultChecked={user.avatar.visible === "1"}
            type="checkbox"
          />
          <input
            className="btn btn-lg btn-register w-100 mt-3 text-white"
            type="submit"
            value="Save changes"
          />
        </form>
      </div>
    </div>
  );
};

export default EditAvatar;
