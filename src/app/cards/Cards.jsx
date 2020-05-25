import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import Card from "./Card";
import CreateCard from "./CreateCard";

const Cards = ({ selectedChat }) => {
  const context = useContext(LocaleContext);

  const [cards, setCards] = useState(null);
  const [newCard, setNewCard] = useState(true);

  useEffect(() => {
    const getCards = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/cards/${context.user.id}/${selectedChat}`
      );
      setCards(response.data);
    };
    if (selectedChat !== "") getCards();
    setNewCard(false);
  }, [selectedChat, context.lang, context.user.id, newCard]);

  return (
    <div className="col-xl-3 col-12 p-1 cards">
      <div className="bg">
        <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
        {cards ? <MyCards cards={cards} /> : <NoCards />}
        <div className="text-center mt-2">
          <CreateCard
            user={selectedChat}
            lang={context.lang}
            setNewCard={setNewCard}
          />
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

const MyCards = ({ cards }) => {
  return (
    <div>
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  );
};

export default Cards;
