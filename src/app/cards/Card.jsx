import React from "react";
import CardModal from "./CardModal";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

const Card = ({ card, setChanges, page, setPage, maxPages }) => {
  return (
    <>
      <div
        className="card-img"
        style={
          card.offer.images.length < 1
            ? { backgroundImage: "url(/assets/img/img-work.jpg)" }
            : {
                backgroundImage:
                  "url(" +
                  `${process.env.REACT_APP_API_URL}/images/${card.offer.images[0].url}${card.offer.images[0].extension}` +
                  ")",
              }
        }
      ></div>
      <div className="text-center">
        <div className="directions">
          {page !== 0 && (
            <div
              className="left"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FaArrowCircleLeft />
            </div>
          )}
          {page !== maxPages - 1 && (
            <div className="right">
              <FaArrowCircleRight
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            </div>
          )}
        </div>
        <div className="title">{card.offer.translations[0].title}</div>
        <div className="description">
          "{card.offer.translations[0].description}"
        </div>
        <div className="offer_date">{card.work_date}</div>
        <div className="offer_status">
          <strong>Status:</strong> {card.status}
        </div>
      </div>
      <CardModal card={card} setChanges={setChanges} />
    </>
  );
};

export default Card;
