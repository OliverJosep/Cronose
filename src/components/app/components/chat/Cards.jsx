import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Cards = ({ cards, user, offers, cancellations }) => {
  return (
    <div className="col-xl-3 col-12 p-1 cards">
      <div className="bg">
        <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
        {cards === null ? <NoCards /> : <MyCards cards={cards} />}
        <div className="text-center mt-2">
          {user && offers && (
            <CreateDemand
              offers={offers.offers}
              cancellations={cancellations}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const NoCards = () => {
  return (
    <div className="text-center mt-3">
      <span>No cards avaliable!</span>
    </div>
  );
};

const MyCards = ({ cards, offer }) => {
  return (
    <>
      {cards.map((card, index) => (
        <div className="row offer-card p-2" key={index}>
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
              <div className="col-12 title">{offer.translations[0].title}</div>
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
};

const CreateDemand = ({ offers, cancellations }) => {
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
            <h4 className="modal-title mb-3">Create Offer</h4>
            <form
              id="create_card"
              method="post"
              target="_self"
              className="form-signin text-center pt-3"
            >
              <SelectOffer offers={offers} />
              <SelectDate />
              <SelectCancellation cancellations={cancellations} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const SelectOffer = ({ offers }) => {
  return (
    <div className="mb-2">
      <label htmlFor="create_card">Select offer:</label>
      <select
        id="selected_offer"
        name="selected_offer"
        className="form-control"
        defaultValue="0"
        required
      >
        <option defaultValue={0} value={0} disabled>
          Select offer
        </option>
        {offers.map((offer, index) => (
          <option key={index} value={offer.specialization_id}>
            {offer.translations[0].title}
          </option>
        ))}
      </select>
    </div>
  );
};

const SelectDate = () => {
  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  const time =
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);
  return (
    <div className="mb-2">
      <label htmlFor="create_card">Date of the meeting:</label>
      <div className="row">
        <div className="col-6 pr-1">
          <input
            className="form-control"
            type="date"
            id="date"
            defaultValue={today}
            min={today}
          />
        </div>
        <div className="col-6 pl-1">
          <input
            className="form-control p-1"
            type="time"
            id="time"
            defaultValue={time}
            min={time}
          />
        </div>
      </div>
    </div>
  );
};

const SelectCancellation = ({ cancellations }) => {
  return (
    <div className="mb-2">
      <label htmlFor="selected_cancellation">Select cancellation:</label>
      <select
        id="selected_cancellation"
        name="selected_cancellation"
        className="form-control"
        defaultValue="0"
        required
      >
        <option defaultValue={0} value={0} disabled>
          Select cancellation:
        </option>
        {cancellations.map((cancellation, index) => (
          <option key={index} value={cancellation.cancellation_policy_id}>
            {cancellation.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Cards;
