import React from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { NavLink } from "react-router-dom";
import UserAvatar from "../components/Avatar";

export default function OfferCard(props) {
  const offer = props.offer;
  const user = props.offerUser;

  return (
    <article className="card work-card">
      <section className="info row">
        <figure className="col-lg-3">
          <img
            className="card-img"
            src="/assets/img/img-work.jpg"
            alt="img-work"
          />
        </figure>
        <div className="col-lg-9">
          <section className="header card-header row">
            <p className="schedule col-2 text-muted my-auto d-none d-md-block">
              HORARIO
            </p>
            <div className="col-6 d-inline-flex">
              <ul className="list-group list-group-horizontal list-unstyled mb-4 my-auto">
                <li className="text-muted my-auto">L</li>
                <li className="">M</li>
                <li className="">X</li>
                <li className="text-muted my-auto">J</li>
                <li className="">V</li>
                <li className="">S</li>
                <li className="">D</li>
              </ul>
              <p className="ml-4 my-auto">
                De: <b>10:00h</b> a <b>14:00h</b>
              </p>
            </div>
            <div className="valuation col-4 text-right my-auto">
              <Rater
                total={5}
                rating={offer.valoration_avg / 20}
                interactive={false}
              />
            </div>
          </section>
          <div className="card-body">
            <h4>
              <b>{offer.title || offer.translations[0].title}</b>
            </h4>
            <UserAvatar name={user.full_name} avatar={user.avatar} size={30} />
            {user.full_name && user.full_name + " | "}
            <small className="d-inline form-text">{user.initials}</small>
            <small className="d-inline text-muted">#{user.tag}</small>
            <hr></hr>
            <p className="card-text">
              {offer.description || offer.translations[0].description}
            </p>
            <section className="text-right">
              <p className="price d-inline">
                <b>Precio: {offer.coin_price}</b>
              </p>
              <NavLink
                to={`/offer/${user.initials}/${user.tag}/${offer.specialization_id}`}
                className="btn text-white"
              >
                See Offer
              </NavLink>
              {console.log(props)}
              {props.user &&
                user.initials === props.user.initials &&
                user.tag === props.user.tag && (
                  <NavLink
                    to={`/offer/edit/${offer.specialization_id}`}
                    className="btn text-white"
                  >
                    Edit
                  </NavLink>
                )}
            </section>
          </div>
        </div>
      </section>
    </article>
  );
}
