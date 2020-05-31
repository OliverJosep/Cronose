import React, { useState, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import Rater from "react-rater";

const Valorate = ({ cards }) => {
  const context = useContext(LocaleContext);

  const [offerRating, setOfferRating] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("card_id", cards[0].id);
    formData.set("offer_puntuation", offerRating);
    formData.set("valorated_by", context.user.id);
    Axios.post(`${process.env.REACT_APP_API_URL}/valoration`, formData);
  };

  return (
    <div className="valorate_bg">
      <div className="logo">
        <img src="/assets/img/svg/logo.svg" width="50" alt="Cronose" />
        <span className="title">Cronose</span>
      </div>
      <div className="logout">
        <span onClick={() => context.logout()}>Log out</span>
      </div>
      <div className="container title">
        <h1 className="">You have to value!</h1>
      </div>
      <div className="container p-0">
        <div className="jumbotron p-0">
          <form id="valorate_form" onSubmit={handleSubmit}>
            <div className="row m-4">
              <div className="col-4">
                <span className="title">Title:</span>{" "}
                {cards[0].offer.translations[0].title}
              </div>
              <div className="col-4 text-center">
                <span className="title">Worker:</span>{" "}
                {cards[0].worker.initials}#{cards[0].worker.tag}
              </div>
              <div className="col-4 text-right">
                <span className="title">Client:</span>{" "}
                {cards[0].client.initials}#{cards[0].client.tag}
              </div>
            </div>
            {context.user.id !== cards[0].worker.id && (
              <>
                <div className="row ml-4 mr-4 mt-4 mb-2 valoration">
                  <label
                    htmlFor="offer-valoration-text"
                    className="label_title"
                  >
                    Offer valoration
                  </label>
                  <Rater
                    total={5}
                    onRate={({ rating }) => setOfferRating(rating * 20)}
                  />
                </div>
                <div className="row ml-4 mr-4">
                  <textarea
                    name="offer-valoration-text"
                    id="offer-valoration-text"
                    rows="3"
                    className="w-100 mb-3"
                  />
                </div>
              </>
            )}
            <div className="row d-flex justify-content-center m-4">
              <button className="submit w-25 p-2">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Valorate;
