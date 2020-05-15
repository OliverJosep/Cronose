import React from "react";
import Axios from "axios";

function sendEmail(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData);
  Axios.get(
    `${process.env.REACT_APP_API_URL}/reset_password/${data.email}`,
    formData
  );
}

export default function Reset() {
  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="bannerformmodal"
      aria-hidden="true"
      id="reset_password"
    >
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h4 className="modal-title mb-4">Reset password</h4>
          <form
            id="login_form"
            method="post"
            target="_self"
            className="form-signin"
            onSubmit={sendEmail}
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
            <input
              className="btn-login btn btn-lg btn-primary btn-block mt-4"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
