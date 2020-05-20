import React from "react";
import { SideBar } from "../layouts/Nav";

const App = ({ navigator }) => {
  return (
    <div id="app" className="w-100">
      <SideBar routes={navigator.routes} />
    </div>
  );
};

export default App;
