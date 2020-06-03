import React, { useContext } from "react";
import md5 from "md5";
import { LocaleContext } from "../../../contexts/LocaleContext";
import Axios from "axios";

const EditPassword = () => {
  const { user, jwt, login } = useContext(LocaleContext);

  const updatePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("user_id", user.id);
    let old_password = md5(formData.get("old_password"));
    let new_password = md5(formData.get("new_password"));
    let repeat_password = md5(formData.get("repeat_password"));
    formData.delete(old_password, new_password, repeat_password);
    formData.set("password", new_password);
    formData.set("jwt", jwt);
    if (await equals(new_password, repeat_password, old_password)) {
      Axios.post(
        `${process.env.REACT_APP_API_URL}/reset_password`,
        formData
      ).then(() => {
        let data = new FormData();
        data.set("email", user.email);
        data.set("password", new_password);
        data = Object.fromEntries(data);
        login(data);
      });
    }
  };

  const equals = async (new_password, repeat_password, old_password) => {
    if (new_password === repeat_password) {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/password/${user.id}`
      );
      if (old_password === response.data.password) return true;
    }
  };

  return (
    <div className="mt-4 mb-4 box">
      <div className="title p-2">
        Password |{" "}
        <span className="user">
          {user.initials}#<span className="text-muted">{user.tag}</span>
        </span>
      </div>
      <div className="body">
        <form
          id="password"
          method="post"
          target="_self"
          className="form-signin"
          onSubmit={updatePassword}
        >
          <div className="row pt-4">
            <div className="col-3 text-right pr-3">
              <label htmlFor="old_password">Old password</label>
            </div>
            <div className="col-7">
              <input
                id="old_password"
                name="old_password"
                className="form-control"
                type="password"
                required
              />
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-3 text-right pr-3">
              <label htmlFor="new_password">New password</label>
            </div>
            <div className="col-7">
              <input
                id="new_password"
                name="new_password"
                className="form-control"
                type="password"
                required
              />
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-3 text-right pr-3">
              <label htmlFor="repeat_password">Repeat password</label>
            </div>
            <div className="col-7">
              <input
                id="repeat_password"
                name="repeat_password"
                className="form-control"
                type="password"
                required
              />
            </div>
          </div>
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

export default EditPassword;
