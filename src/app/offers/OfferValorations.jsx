import React from "react";
import Rater from "react-rater";
import { NavLink } from "react-router-dom";
import Name from "../components/Name";
import UserAvatar from "../components/Avatar";

const OfferValorations = ({ valorations }) => {
  return (
    <div className="row w-100 ">
      <div className="container-fluid mt-4">
        <div className="mb-4">
          <h4>Comments</h4>
          <div className="border-bottom col-4"></div>
          <div className="container-fluid mt-3">
            {valorations.map((valoration, index) => (
              <React.Fragment key={index}>
                <div className="row mt-2">
                  <div className="col-8">
                    <UserAvatar
                      name={valoration.valorated_by.full_name}
                      avatar={valoration.valorated_by.avatar}
                      size={50}
                    />
                    <NavLink
                      className="link"
                      to={`/profile/${valoration.valorated_by.initials}/${valoration.valorated_by.tag}`}
                    >
                      <h4 className="ml-2 my-auto">
                        <Name user={valoration.valorated_by} />
                      </h4>
                    </NavLink>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-8">
                    <p>"{valoration.text}"</p>
                  </div>
                  <div className="pl-3 col-4">
                    <div className="text-left">
                      <small className="muted mr-2 my-auto">
                        Valoration Average
                      </small>
                      <Rater
                        total={5}
                        rating={valoration.puntuation / 20}
                        interactive={false}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferValorations;
