import React from "react";
import Translate from "../../../translations/Translate";

export default function Contact() {
  return (
    <div className="container mb-5 mt-5" id="contact">
      <h1>
        <Translate string={"contact"} />
      </h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="form-group mt-4">
        <label htmlFor="exampleFormControlInput1">Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Email"
        ></input>
        <label className="mt-2" htmlFor="exampleFormControlTextarea1">
          Body
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Text"
        ></textarea>
        <button className="btn btn-orange mt-2 text-white float-right">
          Contact
        </button>
        <div className="clearfix"></div>
      </div>
    </div>
  );
}
