import React from "react";
import HomePage from "./app/HomePage";
import App from "./app/App";
import Loader from "./app/components/Loader";

import navigators from "./configs/navigators.jsx";
import LocaleContextProvider, { LocaleContext } from "./contexts/LocaleContext";

const Platform = () => {
  return (
    <LocaleContextProvider>
      <LocaleContext.Consumer>
        {(context) => {
          if (context.jwt.length > 0) {
            if (!context.user) {
              context.login(context);
              return <Loader />;
            }
            if (context.user)
              return (
                <App
                  navigator={navigators.filter((nav) => nav.name === "app")[0]}
                />
              );
          }
          return (
            <HomePage
              navigator={navigators.filter((nav) => nav.name === "root")[0]}
            />
          );
        }}
      </LocaleContext.Consumer>
    </LocaleContextProvider>
  );
};

export default Platform;
