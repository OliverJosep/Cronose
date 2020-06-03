import React from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ offer }) => {
  return (
    <div className="profile_card">
      <div
        className="card_img"
        alt="img-work"
        style={
          offer.images.length < 1
            ? { backgroundImage: "url(/assets/img/img-work.jpg)" }
            : {
                backgroundImage:
                  "url(" +
                  `${process.env.REACT_APP_API_URL}/images/${offer.images[0].url}${offer.images[0].extension}` +
                  ")",
              }
        }
      ></div>
      <div className="card-body">
        <div className="card-title m-1">
          <div className="d-flex justify-content-end">
            <Rater
              total={5}
              rating={offer.valoration_avg / 10 / 2}
              interactive={false}
            />
          </div>
          <h4 className="m-0">
            <b>{offer.title || offer.translations[0].title}</b>
          </h4>
        </div>
        <p className="card-text pt-2">
          {offer.description || offer.translations[0].description}
        </p>
        <NavLink
          to={`/offer/${offer.user.initials}/${offer.user.tag}/${offer.specialization_id}`}
          className="btn btn-block text-white"
        >
          See Offer
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileCard;
