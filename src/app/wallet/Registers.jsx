import React from "react";
import Rater from "react-rater";

const Registers = ({ card, index }) => {
  return (
    <div id="records">
      <div id="record">
        <div className="card m-5">
          <h5 className="card-header">
            <a
              data-toggle="collapse"
              href={"#collapse-content" + index}
              aria-expanded="true"
              aria-controls={"collapse-content" + index}
              id="heading-content"
              className="d-block"
            >
              <i className="fa fa-chevron-down pull-right"></i>
              {card.date} | COINS : <b>{card.coins}</b>
            </a>
          </h5>
          {console.log(card)}
          <div
            id={"collapse-content" + index}
            className="collapse"
            aria-labelledby="heading-content"
          >
            <div className="card-body">
              <section className="row">
                <p className="schedule col-6 text-muted">HORARIO</p>
                <div className="valuation col-6 text-right">
                  <Rater total={5} rating={3} interactive={false} />
                </div>
              </section>
              <h4>
                <b>{card.card.offer.translations[0].title}</b>
              </h4>
              <hr></hr>
              <p className="card-text">
                "{card.card.offer.translations[0].description}"
              </p>
              <section className="text-right">
                <p className="price">
                  <b>{card.coin_price}</b>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registers;
