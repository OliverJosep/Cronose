import React from "react";
import SideBar from "../app/navigation/SideBar";

const App = ({ navigator }) => {
  return (
    <div id="app" className="w-100">
      <SideBar routes={navigator.routes} />
    </div>
  );
};

export default App;
