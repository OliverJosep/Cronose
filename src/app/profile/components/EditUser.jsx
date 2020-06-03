import React, { useState, useContext, useEffect } from "react";
import { LocaleContext } from "../../../contexts/LocaleContext";
import Axios from "axios";

const EditUser = () => {
  const { user, jwt, updateUser } = useContext(LocaleContext);

  const [provinces, setProvinces] = useState();
  const [selProvince, setSelProvince] = useState();
  const [cities, setCities] = useState();

  useEffect(() => {
    const getProvinces = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/provinces`
      );
      setProvinces(response.data);
    };
    setSelProvince(user.address.province.id);

    getProvinces();
  }, [user]);

  useEffect(() => {
    const getCities = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/cities/${selProvince}`
      );
      setCities(response.data);
    };
    getCities();
  }, [selProvince]);

  const updateUserData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("user_id", user.id);
    formData.set("jwt", jwt);
    formData.delete("province_id");
    Axios.post(`${process.env.REACT_APP_API_URL}/user/update`, formData).then(
      () => {
        updateUser(user.id);
      }
    );
  };

  return (
    <div className="mt-4 box">
      <div className="title p-2">
        Edit User |{" "}
        <span className="user">
          {user.initials}#<span className="text-muted">{user.tag}</span>
        </span>
      </div>
      <div className="body">
        <form
          id="update_form"
          method="post"
          target="_self"
          className="form-signin"
          onSubmit={updateUserData}
        >
          <div className="row pt-4">
            <div className="col-3 text-right pr-3">
              <label htmlFor="full_name">Name</label>
            </div>
            <div className="col-7">
              <input
                id="full_name"
                name="full_name"
                className="form-control"
                type="text"
                value={user.name ? user.full_name : "Private account"}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="mt-3 col-3 text-right pr-3">
              <label htmlFor="email">Email</label>
            </div>
            <div className="mt-3 col-7">
              <input
                id="email"
                name="email"
                className="form-control"
                type="text"
                defaultValue={user.email}
              />
            </div>
          </div>
          <div className="row">
            <div className="mt-3 col-3 text-right pr-3">
              <label htmlFor="province_id">Province</label>
            </div>
            <div className="mt-3 col-7">
              <select
                id="province_id"
                name="province_id"
                className="form-control"
                onChange={({ target }) => setSelProvince(target.value)}
                defaultValue="0"
                required
              >
                <option
                  defaultValue={user.address.province.id}
                  value={user.address.province.id}
                >
                  {user.address.province.name}
                </option>
                {provinces &&
                  provinces.map((province, index) => (
                    <option key={index} value={province.id}>
                      {province.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="mt-3 col-3 text-right pr-3">
              <label htmlFor="city_cp">City</label>
            </div>
            <div className="mt-3 col-7">
              <select
                id="city_cp"
                name="city_cp"
                className="form-control"
                defaultValue="0"
                required
              >
                <option
                  defaultValue={user.address.city.cp}
                  value={user.address.city.cp}
                >
                  {user.address.city.name}
                </option>
                {cities &&
                  cities.map((cities, index) => (
                    <option key={index} value={cities.cp}>
                      {cities.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="mt-3 col-3 text-right pr-3">
              <label htmlFor="private">Private</label>
            </div>
            <div className="mt-3 col-7">
              <input
                id="private"
                name="private"
                defaultChecked={user.private === "1"}
                type="checkbox"
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

export default EditUser;
