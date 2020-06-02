import React, { useState, useEffect, useContext } from "react";
import OfferCard from "./OfferCard";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { LocaleContext } from "../../contexts/LocaleContext";
import { NavLink } from "react-router-dom";

const MyOffers = () => {
  const context = useContext(LocaleContext);

  const [offers, setOffers] = useState();

  useEffect(() => {
    const getOffers = () => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/offers/user/${context.user.id}/all`
      ).then((response) => setOffers(response.data));
    };

    getOffers();
  }, [context.lang, context.user]);

  if (!offers) return <>loading</>;
  return (
    <>
      <div className="text-center mt-4 pt-2">
        <h1>My Offers</h1>
      </div>
      <section className="works">
        {offers.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </section>
      <div className="text-center">
        <NavLink to="/newoffer" className="btn btn-lg mb-4">
          NEW OFFER
        </NavLink>
      </div>
    </>
  );
};

export default MyOffers;
