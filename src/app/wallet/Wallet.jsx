import React, { useState, useContext, useEffect } from "react";
import "react-rater/lib/react-rater.css";
import { LocaleContext } from "../../contexts/LocaleContext";
import Axios from "axios";
import Registers from "./Registers";
import HisrotyChat from "./HistoryChart";

const Wallet = () => {
  const context = useContext(LocaleContext);

  const [data, setData] = useState();

  useEffect(() => {
    const getHistory = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/history`,
        {
          params: {
            user_id: context.user.id,
            jwt: context.jwt,
            limit: 10,
          },
        }
      );
      setData(response.data);
    };
    getHistory();
  }, [context]);

  return (
    <>
      <div className="text-center pt-4">
        <h1>Wallet</h1>
      </div>
      <HisrotyChat data={data} />
      {data &&
        data.map((card, index) => (
          <Registers
            card={card}
            index={index}
            user_id={context.user.id}
            key={index}
          />
        ))}
    </>
  );
};

export default Wallet;
