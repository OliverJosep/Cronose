import React, { useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import Translate from "../../translations/Translate";

const CardModal = ({ card, setChanges }) => {
  const context = useContext(LocaleContext);

  const action = ({ target }) => {
    const formData = new FormData();
    formData.set("user_id", card.worker.id);
    formData.set("card_id", card.id);
    formData.set("status", target.value);
    formData.set("jwt", context.jwt);
    Axios.post(`${process.env.REACT_APP_API_URL}/card`, formData);
    setChanges(true);
  };

  return (
    <div
      className="modal fade"
      id={"cardModal" + card.id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="cardModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold" id="cardModalLabel">
              {card.offer.translations[0].title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <span className="font-weight-bold">Worker:</span> &nbsp;
              {card.worker.id === context.user.id ? (
                <Translate string="you" />
              ) : (
                card.worker.full_name
              )}
            </div>
            <div className="row">
              <span className="font-weight-bold">Client:</span> &nbsp;
              {card.client.id === context.user.id ? (
                <Translate string="you" />
              ) : (
                card.client.full_name
              )}
            </div>
            <div className="row">
              <span className="font-weight-bold">Price:</span> &nbsp;
              {card.offer.coin_price}
            </div>
            <div className="row">
              <span className="font-weight-bold">Date:</span> &nbsp;
              {card.work_date}
            </div>
            <div className="row">
              <span className="font-weight-bold">Status:</span> &nbsp;
              {card.status}
            </div>
            <div className="row">
              <span className="font-weight-bold">Cancellation:</span> &nbsp;
              {card.cancellation_policy.name}
            </div>

            {card.worker.id === context.user.id && card.status !== "done" && (
              <Accept action={action} />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Accept = ({ action }) => {
  return (
    <div className="text-center mt-3">
      <button onClick={action} value="accepted" className="mr-1">
        Accept the offer
      </button>
      <button onClick={action} value="rejected" className="ml-1">
        Reject the offer
      </button>
    </div>
  );
};

export default CardModal;
