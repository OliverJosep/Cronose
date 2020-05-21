import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import CreateCard from "./CreateCard";

const Cards = ({ user }) => {
  const context = useContext(LocaleContext);

  const [cards, setCards] = useState(null);

  useEffect(() => {
    const getCards = async () => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/cards/${context.user.id}/${user}`
      ).then((response) => {
        setCards(response.data);
      });
    };
    if (user !== "") getCards();
  }, [user, context.lang, context.user.id]);

  return (
    <div className="col-xl-3 col-12 p-1 cards">
      <div className="bg">
        <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
        {cards ? <MyCards cards={cards} /> : <NoCards />}
        <div className="text-center mt-2">
          <CreateCard user={user} lang={context.lang} />
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
};

export default Cards;
