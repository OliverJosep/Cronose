import React from "react";
import Rater from "react-rater";
import Name from "../components/Name";
import { NavLink } from "react-router-dom";

const Registers = ({ card, index, user_id }) => {
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
          <div
            id={"collapse-content" + index}
            className="collapse"
            aria-labelledby="heading-content"
          >
            <div className="card-body">
              <section className="row">
                <p className="schedule col-6 text-muted">
                  {card.worker_id === user_id ? (
                    <>
                      Client:
                      <NavLink
                        className="link"
                        to={
                          "/profile/" +
                          card.card.client.initials +
                          "/" +
                          card.card.client.tag
                        }
                      >
                        <Name user={card.card.client} />
                      </NavLink>
                    </>
                  ) : (
                    <>
                      Worker:
                      <NavLink
                        className="link"
                        to={
                          "/profile/" +
                          card.card.worker.initials +
                          "/" +
                          card.card.worker.tag
                        }
                      >
                        <Name user={card.card.worker} />
                      </NavLink>
                    </>
                  )}
                </p>
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
                  <b>
                    {card.worker_id === user_id ? "+" : "-"}
                    {card.coin_price}
                  </b>
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
