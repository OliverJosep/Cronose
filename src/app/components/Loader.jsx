import React from "react";
import Loader from "react-loader-spinner";

const loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader type="Circles" color="#f09a24" height={100} width={100} />
    </div>
  );
};

export const SmallLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "75px",
      }}
    >
      <Loader type="Circles" color="#f09a24" height={100} width={100} />
    </div>
  );
};

export default loader;
