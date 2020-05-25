import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { MdAddCircleOutline } from "react-icons/md";
import { LocaleContext } from "../../contexts/LocaleContext";

const CreateCard = ({ user, lang, setNewCard }) => {
  const context = useContext(LocaleContext);
  const [offers, setOffers] = useState();
  const [cancellations, setCancellations] = useState();

  // Get Offers
  useEffect(() => {
    const getOffers = () => {
      user &&
        Axios.get(
          `${process.env.REACT_APP_API_URL}/${lang}/offers/user/${user}`
        ).then((response) => {
          setOffers(response.data);
        });
    };
    getOffers();
  }, [user, lang]);

  // Get Cancellations
  useEffect(() => {
    const getCancellations = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/${lang}/cancellations`).then(
        (response) => {
          setCancellations(response.data);
        }
      );
    };

    getCancellations();
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    const timestamp =
      data.get("date") + " " + document.getElementById("time").value + ":00";
    data.delete("date");
    data.set("worker_id", user);
    data.set("user_id", context.user.id);
    data.set("work_date", timestamp);
    data.set("jwt", context.jwt);
    await Axios.post(`${process.env.REACT_APP_API_URL}/demand`, data);
    setNewCard(true);
  };

  if (!offers) return <></>;
  return (
    <div>
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
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <form
              id="create_card"
              method="post"
              target="_self"
              className="form-signin text-center pt-3"
              onSubmit={handleSubmit}
            >
              <SelectOffer offers={offers} />
              <SelectDate />
              <SelectCancellation cancellations={cancellations} />
              <input
                className="btn btn-lg btn-register w-100 mt-3 text-white"
                type="submit"
                value="Create"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectOffer = ({ offers }) => {
  return (
    <div className="mb-2">
      <label htmlFor="create_card">Select offer:</label>
      <select
        id="specialization_id"
        name="specialization_id"
        className="form-control"
        defaultValue="0"
        required
      >
        <option defaultValue={0} value={0} disabled>
          Select offer
        </option>
        {offers &&
          offers.map((offer, index) => (
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
  return (
    <div className="mb-2">
      <label htmlFor="date">Date of the meeting:</label>
      <div className="row">
        <div className="col-6 pr-1">
          <input
            className="form-control"
            name="date"
            type="date"
            id="date"
            defaultValue={today}
            min={today}
          />
        </div>
        <div className="col-6 pl-1">
          <input
            className="form-control p-1"
            time="time"
            type="time"
            id="time"
            defaultValue="00:00"
            min="00:00"
          />
        </div>
      </div>
    </div>
  );
};

const SelectCancellation = ({ cancellations }) => {
  return (
    <div className="mb-2">
      <label htmlFor="cancellation_policy">Select cancellation:</label>
      <select
        id="cancellation_policy"
        name="cancellation_policy"
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

export default CreateCard;
