import React, { useState, useContext, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "react-rater/lib/react-rater.css";
import { LocaleContext } from "../../contexts/LocaleContext";
import Axios from "axios";
import Registers from "./Registers";

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
      {data && (
        <div className="text-center">
          <LineChart
            width={1000}
            height={500}
            data={data.reverse()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="coins"
              stroke="#f09a24"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
      {data &&
        data
          .reverse()
          .map((card, index) => (
            <Registers card={card} index={index} key={index} />
          ))}
    </>
  );
};

export default Wallet;
