import React, { useState, useEffect, useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { LocaleContext } from "../../contexts/LocaleContext";
import Translate from "../../translations/Translate";
import Loader from "../components/Loader";
import UserAvatar from "../components/Avatar";
import OfferValorations from "./OfferValorations";

const OfferDetails = ({ match }) => {
  const context = useContext(LocaleContext);

  const [offer, setOffer] = useState();
  const { initials, tag, specialization } = match.params;

  useEffect(() => {
    const getOffers = () => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/offer/${initials}/${tag}/${specialization}`
      ).then((response) => setOffer(response.data));
    };

    getOffers();
  }, [context.lang, initials, tag, specialization]);
  if (!offer) return <Loader></Loader>;
  return (
    <section className="work">
      <div className="container mt-2">
        <div className="row">
          <h1>{offer.title}</h1>
          <h3 className="my-auto ml-4"> Precio: {offer.coin_price}</h3>
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
            <div
              id="carousel"
              className="carousel slide m-auto"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carousel"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#carousel" data-slide-to="1"></li>
                <li data-target="#carousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src="/assets/img/img-work.jpg"
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="/assets/img/img-work.jpg"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="/assets/img/img-work.jpg"
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <div className="row">
              <div className="col-6">
                <Rater
                  total={5}
                  rating={offer.personal_valoration / 20}
                  interactive={false}
                />
                <small className="muted ml-2 my-auto">
                  Personal Valoration
                </small>
              </div>
              <div className="col-6 text-right">
                <small className="muted mr-2 my-auto">Users Valoration</small>
                <Rater
                  total={5}
                  rating={offer.valoration_avg / 20}
                  interactive={false}
                />
              </div>
            </div>
            <div className="row mt-2">
              <UserAvatar
                name={offer.user.full_name}
                avatar={offer.user.avatar}
                size={50}
              />
              <div className="ml-2 my-auto">
                {offer.user.full_name || offer.user.initials}
                <h6 className="d-inline text-muted">#{offer.user.tag}</h6>
              </div>
            </div>
            <div className="row mt-4">
              <div className="container-fluid">
                <h4>{offer.translations[0].title}</h4>
                <hr />
                <p>
                  {offer.translations[0].description ? (
                    offer.translations[0].description
                  ) : (
                    <Translate string={"no-description"} />
                  )}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="container-fluid">
                <h4>User info</h4>
                <hr />
                <div className="row mt-2">
                  <img
                    src="/assets/img/avatar-placeholder.png"
                    height="40px"
                    alt="avatar-placeholder"
                  />
                  <h4 className="ml-2 my-auto">{offer.user.full_name}</h4>
                </div>
                <div className="row">
                  <div className="container-fluid mt-4">
                    <div className="col-4">
                      <h4>Description</h4>
                      <hr />
                    </div>
                    <p>
                      {offer.user.description ? (
                        offer.user.description[0].description
                      ) : (
                        <Translate string={"no-description"} />
                      )}
                    </p>
                  </div>
                </div>
                <OfferValorations valorations={offer.valorations} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="m-3">
              <h4>Schedule</h4>
              <hr />
              <p>
                <b>Días de la semana:</b> Entre semana.
              </p>
              <p>
                <b>Horario:</b> De 10:00h a 13:00h.
              </p>
            </div>
            <div className="m-3 mt-4">
              <h4>Zone info</h4>
              <hr />
              <p>Realizo el trabajo en mi casa, no hago desplazamientos.</p>
            </div>
            <div className="m-3">
              <Moves />
            </div>
            <div className="text-center mt-4">
              {context.user && context.user.id === offer.user.id ? (
                <NavLink
                  to={`/offer/edit/${offer.specialization_id}`}
                  className="btn pl-4 pr-4"
                >
                  Edit
                </NavLink>
              ) : (
                <NavLink
                  to={`/chat?id=${offer.user.id}`}
                  className="btn pl-4 pr-4"
                >
                  Contact
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const position = [39.5643576, 3.20227];

const styles = {
  wrapper: {
    height: 200,
    width: "100%",
    margin: "0 auto",
    display: "flex",
  },
  map: {
    flex: 1,
  },
};

const Moves = (props) => {
  return (
    <div style={styles.wrapper}>
      <Map style={styles.map} center={props.center} zoom={props.zoom}>
        <TileLayer url={props.url} />
        <Marker position={position}>
          <Popup>
            <b>Mi casa</b>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

Moves.defaultProps = {
  center: [39.5643576, 3.20227],
  zoom: 16,
  url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
};

export default OfferDetails;
