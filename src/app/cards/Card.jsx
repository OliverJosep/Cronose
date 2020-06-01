import React from "react";
import CardModal from "./CardModal";

const Card = ({ card, setChanges }) => {
  return (
    <div
      className={"row chat-card p-2 " + card.status}
      data-toggle="modal"
      data-target={"#cardModal" + card.id}
    >
      <div className="col-6 text-center d-block d-md-none d-xl-block">
        <img
          className="m-auto"
          src="/assets/img/img-work.jpg"
          width="auto"
          height="71px"
          alt="img-work"
        ></img>
      </div>
      <div className="col-6 col-md-12 col-xl-6 text-md-center text-xl-left">
        <div className="row">
          <div className="col-12 title">{card.offer.translations[0].title}</div>
          <div className="col-12">{card.work_date}</div>
          <div className="col-12">
            <strong>Status:</strong> {card.status}
          </div>
        </div>
      </div>
      <CardModal card={card} setChanges={setChanges} />
    </div>
  );
};

export default Card;
