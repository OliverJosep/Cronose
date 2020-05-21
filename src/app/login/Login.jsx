import React, { useContext } from "react";
import md5 from "md5";
import { LocaleContext } from "../../contexts/LocaleContext";
import { NavLink } from "react-router-dom";
import Reset from "./Reset";

const Login = () => {
  const context = useContext(LocaleContext);

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("password", md5(formData.get("password")));
    const data = Object.fromEntries(formData);
    context.login(data);
  };

  return (
    <div className="card-login card text-center">
      <h3 className="card-title text-center">LOGIN</h3>
      <form
        id="login_form"
        method="post"
        target="_self"
        className="form-signin"
        onSubmit={login}
      >
        <div className="form-label-group mt-4 text-left">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            placeholder="email"
            required
            autoFocus
          />
        </div>
        <div className="form-label-group mt-4 text-left">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            placeholder="password"
            required
          />
        </div>
        <div className="error mt-2">{context.user}</div>
        <input
          className="btn-login btn btn-lg btn-primary btn-block mt-4"
          type="submit"
          value="Submit"
        />
      </form>
      <div className="card-footer">
        <div className="justify-content-center links">
          Don't have an account?
          <NavLink to="/register" activeClassName="active">
            &nbsp;Sign Up!
          </NavLink>
        </div>
        <div className=" justify-content-center">
          <NavLink to={`/#`} data-toggle="modal" data-target="#reset_password">
            Forgot your password?
          </NavLink>
        </div>
      </div>
      <Reset />
    </div>
  );
};

export default Login;
