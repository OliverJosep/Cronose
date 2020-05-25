import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import Loader from "../components/LanguagePicker";

const Valorate = ({ cards }) => {
  const context = useContext(LocaleContext);

  return (
    <div className="valorate_bg">
      <div className="container title">
        <h1 className="">You have to value!</h1>
      </div>
      {/* {cards.map((card, index) => ( */}
      <div className="container p-0">
        <div className="jumbotron p-0">
          <div className="row m-4">
            <div className="col-4">
              <span className="title">Title:</span>{" "}
              {cards[0].offer.translations[0].title}
            </div>
            <div className="col-4 text-center">
              <span className="title">Worker:</span> {cards[0].worker.initials}#
              {cards[0].worker.tag}
            </div>
            <div className="col-4 text-right">
              <span className="title">Client:</span> {cards[0].client.initials}#
              {cards[0].worker.tag}
            </div>
          </div>
          <div className="row ml-4 mr-4 mt-4 mb-2">
            <span>Offer valoration</span>
          </div>
          <div className="row ml-4 mr-4">
            <textarea className="w-100"></textarea>
          </div>
          <div className="row ml-4 mr-4 mt-4 mb-2">
            <span>User valoration</span>
          </div>
          <div className="row ml-4 mr-4 mb-4">
            <textarea className="w-100"></textarea>
          </div>
          <div className="row d-flex justify-content-center m-4">
            <button className="submit w-25 p-2">SUBMIT</button>
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );

  // return (
  //   <div className="valorate_bg">
  //     {/* <div className="valorate"> */}
  //     <div className="title">
  //       <h1 className="mb-4">You have to valorate!</h1>
  //     </div>
  //     {cards &&
  //       cards.map((card, index) => (
  //         <div className="jumbotron jumbotorn bg-white mb-2">
  //           <span>{card.id}</span>
  //           <p>{card.client.full_name}</p>
  //           <p>{card.worker.full_name}</p>
  //         </div>
  //       ))}
  //     {/* </div> */}
  //   </div>
  // );
};

export default Valorate;
