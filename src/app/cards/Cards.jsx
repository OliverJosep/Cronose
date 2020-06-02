import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import Card from "./Card";
import CreateCard from "./CreateCard";

const Cards = ({ selectedChat }) => {
  const context = useContext(LocaleContext);

  const [cards, setCards] = useState(null);
  const [changes, setChanges] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getCards = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/cards/${context.user.id}/${selectedChat}`
      );
      setCards(response.data);
    };
    if (selectedChat !== "") getCards();
    setChanges(false);
    setPage(0);
  }, [selectedChat, context.lang, context.user.id, changes]);

  return (
    <div className="col-xl-3 col-12 p-1 cards">
      <div className="bg">
        <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
        {cards && cards.length > 0 ? (
          <MyCards
            cards={cards}
            setChanges={setChanges}
            page={page}
            setPage={setPage}
          />
        ) : (
          <NoCards />
        )}
        <div className="text-center mt-2">
          <CreateCard
            user={selectedChat}
            lang={context.lang}
            setChanges={setChanges}
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

const MyCards = ({ cards, setChanges, page, setPage }) => {
  return (
    <div className="center-card">
      <Card
        card={cards[page]}
        setChanges={setChanges}
        page={page}
        setPage={setPage}
        maxPages={cards.length}
      />
    </div>
  );
};

export default Cards;
