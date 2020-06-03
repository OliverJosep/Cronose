import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../contexts/LocaleContext";
import Loader from "./components/Loader";
import Valorate from "./valorations/Valorate";
import SideBar from "../app/navigation/SideBar";

const App = ({ navigator }) => {
  const context = useContext(LocaleContext);

  const [cards, setCards] = useState();

  useEffect(() => {
    const getDoneCards = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/cards/done`,
        {
          params: {
            user_id: context.user.id,
            jwt: context.jwt,
          },
        }
      );
      response.data && setCards(response.data);
    };

    getDoneCards();
  }, [context]);
  if (!cards) return <Loader />;
  if (cards.length > 0 && cards[0] !== null) return <Valorate cards={cards} />;
  return (
    <div id="app" className="w-100">
      <SideBar routes={navigator.routes} />
    </div>
  );
};

export default App;
