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
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { LocaleContext } from "../../contexts/LocaleContext";
import Axios from "axios";

const Wallet = () => {
  const context = useContext(LocaleContext);

  const [data, setData] = useState();

  useEffect(() => {
    const getHistory = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/history`,
        {
          params: {
            user_id: context.user.id,
            jwt: context.jwt,
            limit: 10,
          },
        }
      );
      setData(response.data.reverse());
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
            data={data}
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
      <div id="records">
        <div id="record">
          <div className="card m-5">
            <h5 className="card-header">
              <a
                data-toggle="collapse"
                href="#collapse-content1"
                aria-expanded="true"
                aria-controls="collapse-content1"
                id="heading-content"
                className="d-block"
              >
                <i className="fa fa-chevron-down pull-right"></i>
                11/02/2020 | COINS : <b>7</b>
              </a>
            </h5>
            <div
              id="collapse-content1"
              className="collapse"
              aria-labelledby="heading-content"
            >
              <div className="card-body">
                <section className="row">
                  <p className="schedule col-6 text-muted">HORARIO</p>
                  <div className="valuation col-6 text-right">
                    <Rater total={5} rating={3} interactive={false} />
                  </div>
                </section>
                <h4>
                  <b>TITULO</b>
                </h4>
                <hr></hr>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, ea vel prima adhuc, scripta
                  liberavisse ea quo, te vel vidit mollis complectitur.
                </p>
                <section className="text-right">
                  <p className="price">
                    <b>PRECIO</b>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div id="record">
          <div className="card m-5">
            <h5 className="card-header">
              <a
                data-toggle="collapse"
                href="#collapse-content2"
                aria-expanded="true"
                aria-controls="collapse-content2"
                id="heading-content"
                className="d-block"
              >
                <i className="fa fa-chevron-down pull-right"></i>
                11/02/2020 | COINS : <b>7</b>
              </a>
            </h5>
            <div
              id="collapse-content2"
              className="collapse"
              aria-labelledby="heading-content"
            >
              <div className="card-body">
                <section className="row">
                  <p className="schedule col-6 text-muted">HORARIO</p>
                  <div className="valuation col-6 text-right">
                    <Rater total={5} rating={3} interactive={false} />
                  </div>
                </section>
                <h4>
                  <b>TITULO</b>
                </h4>
                <hr></hr>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, ea vel prima adhuc, scripta
                  liberavisse ea quo, te vel vidit mollis complectitur.
                </p>
                <section className="text-right">
                  <p className="price">
                    <b>PRECIO</b>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div id="record">
          <div className="card m-5">
            <h5 className="card-header">
              <a
                data-toggle="collapse"
                href="#collapse-content3"
                aria-expanded="true"
                aria-controls="collapse-content3"
                id="heading-content"
                className="d-block"
              >
                <i className="fa fa-chevron-down pull-right"></i>
                11/02/2020 | COINS : <b>7</b>
              </a>
            </h5>
            <div
              id="collapse-content3"
              className="collapse"
              aria-labelledby="heading-content"
            >
              <div className="card-body">
                <section className="row">
                  <p className="schedule col-6 text-muted">HORARIO</p>
                  <div className="valuation col-6 text-right">
                    <Rater total={5} rating={3} interactive={false} />
                  </div>
                </section>
                <h4>
                  <b>TITULO</b>
                </h4>
                <hr></hr>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, ea vel prima adhuc, scripta
                  liberavisse ea quo, te vel vidit mollis complectitur.
                </p>
                <section className="text-right">
                  <p className="price">
                    <b>PRECIO</b>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div id="record">
          <div className="card m-5">
            <h5 className="card-header">
              <a
                data-toggle="collapse"
                href="#collapse-content4"
                aria-expanded="true"
                aria-controls="collapse-content4"
                id="heading-content"
                className="d-block"
              >
                <i className="fa fa-chevron-down pull-right"></i>
                11/02/2020 | COINS : <b>7</b>
              </a>
            </h5>
            <div
              id="collapse-content4"
              className="collapse"
              aria-labelledby="heading-content"
            >
              <div className="card-body">
                <section className="row">
                  <p className="schedule col-6 text-muted">HORARIO</p>
                  <div className="valuation col-6 text-right">
                    <Rater total={5} rating={3} interactive={false} />
                  </div>
                </section>
                <h4>
                  <b>TITULO</b>
                </h4>
                <hr></hr>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, ea vel prima adhuc, scripta
                  liberavisse ea quo, te vel vidit mollis complectitur.
                </p>
                <section className="text-right">
                  <p className="price">
                    <b>PRECIO</b>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
