import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

export default function Cards(props) {
  return (
    <div className="col-xl-3 col-12 p-1 cards">
      <div className="bg">
        <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
        {props.cards === null ? <NoCards /> : <MyCards cards={props.cards} />}
        <div className="text-center mt-2">
          <MdAddCircleOutline className="add" />
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
