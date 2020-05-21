import React from "react";
import AboutUs from "./AboutUs";
import Translate from "../../translations/Translate";
import HowItWorks from "./HowItWorks";
import Contact from "./Contact";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="container mt-5 pt-4 text-center">
        <h1>
          <Translate string={"share-time"} />
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <NavLink to="/market">
          <input
            type="button"
            className="btn btn-orange"
            value="See Our Market"
          ></input>
        </NavLink>
      </div>
      <HowItWorks />
      <AboutUs />
      <Contact />
    </div>
  );
};

export default Home;
