import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Cards(props) {
  return (
    <div className="col-xl-3 col-12 p-1 cards">
      <div className="bg">
        <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
        {props.cards === null ? <NoCards /> : <MyCards cards={props.cards} />}
        <div className="text-center mt-2">
          <CreateDemand />
        </div>
      </div>
    </div>
  );
}

export function NoCards() {
  return (
    <div className="text-center mt-3">
      <span>No cards avaliable!</span>
    </div>
  );
}

export function MyCards(props) {
  console.log(props);
  return (
    <>
      {props.cards.map((card, index) => (
        <div className="row offer-card p-2" key={index}>
          {console.log(card)}
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
              <div className="col-12 title">
                {card.offer.translations[0].title}
              </div>
              <div className="col-12">{card.work_date}</div>
              <div className="col-12">
                <strong>Status:</strong> {card.status}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function CreateDemand() {
  return (
    <>
      <NavLink to={`/#`} data-toggle="modal" data-target="#createDemand">
        <MdAddCircleOutline className="add" />
      </NavLink>
      <div
        className="modal fade "
        tabIndex="-1"
        role="dialog"
        aria-labelledby="bannerformmodal"
        aria-hidden="true"
        id="createDemand"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <h4 className="modal-title mb-4">
              Condiciones generales de Cronose
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
