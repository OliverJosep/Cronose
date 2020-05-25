import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import Loader from "../components/LanguagePicker";

const Valorate = ({ cards }) => {
  const context = useContext(LocaleContext);

  return (
    <div className="valorate_bg">
      <div className="container title">
        <h1 className="">You have to valorate!</h1>
      </div>
      {cards.map((card, index) => (
        <div className="container">
          <div className="jumbotron p-0">
            <div className="row m-3">
              {/* <span>Title:</span> {card.translations[0].title} */}
            </div>
            <div className="row m-3">
              <span>User:</span>
            </div>
          </div>
        </div>
      ))}
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
