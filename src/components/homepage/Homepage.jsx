import React from "react";
import { NavBar } from "../layouts/Nav";

const HomePage = ({ navigator }) => {
  return (
    <div id="homepage" className="w-100">
      <NavBar routes={navigator.routes} />
    </div>
  );
};

export default HomePage;
