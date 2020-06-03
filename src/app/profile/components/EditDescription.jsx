import React, { useState, useContext, useEffect } from "react";
import { LocaleContext } from "../../../contexts/LocaleContext";
import Translate from "../../../translations/Translate";
import Axios from "axios";

const EditDescription = () => {
  const { user, jwt, updateUser } = useContext(LocaleContext);

  const [descriptions, setDescriptions] = useState();

  useEffect(() => {
    const getDescriptions = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/user/description/${user.id}`
      );
      setDescriptions(response.data);
    };
    getDescriptions();
  }, [user]);

  const updateDescription = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("user_id", user.id);
    formData.set("jwt", jwt);
    Axios.post(
      `${process.env.REACT_APP_API_URL}/user/description`,
      formData
    ).then(() => {
      updateUser(user.id);
    });
  };

  return (
    <div className="mt-4 box">
      <div className="title p-2">
        Description |{" "}
        <span className="user">
          {user.initials}#<span className="text-muted">{user.tag}</span>
        </span>
      </div>
      <div className="body">
        <form
          id="description_form"
          method="post"
          target="_self"
          className="form-signin"
          onSubmit={updateDescription}
        >
          {descriptions &&
            descriptions.map((description, index) => (
              <div className="row pt-4" key={index}>
                <div className="col-3 text-right pr-3">
                  <label htmlFor={description.language_id + "_description"}>
                    {" "}
                    <Translate string={description.language_id} />
                  </label>
                </div>
                <div className="col-7">
                  <textarea
                    id={description.language_id + "_description"}
                    name={description.language_id}
                    className="form-control"
                    defaultValue={description.description}
                  />
                </div>
              </div>
            ))}
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

export default EditDescription;
