import React from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { NavLink } from "react-router-dom";

export default function ProfileCard(props) {
  const work = props.work;
  return (
    <div className="card card-profile mt-3">
      <img
        className="card-img-top"
        src="/assets/img/img-work.jpg"
        alt="img-work"
      ></img>
      <div className="card-body">
        <div className="card-title">
          <div className="d-flex justify-content-end">
            <Rater
              total={5}
              rating={work.valoration_avg / 10 / 2}
              interactive={false}
            />
          </div>
          <h4>
            <b>{work.title || work.translations[0].title}</b>
          </h4>
        </div>
        <p className="card-text">
          {work.description || work.translations[0].description}
        </p>
        <NavLink to="#" className="btn btn-block text-white">
          See Offer
        </NavLink>
      </div>
    </div>
  );
}
