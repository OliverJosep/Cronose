import React from "react";
import HomePage from "./components/homepage/Homepage";
import App from "./components/app/App";
import Loader from "./components/layouts/Loader";

import navigators from "./configs/navigators.jsx";
import LocaleContextProvider, { LocaleContext } from "./contexts/LocaleContext";

export default function Platform() {
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
                  changeLanguage={context.changeLanguage}
                />
              );
          }
          return (
            <HomePage
              navigator={navigators.filter((nav) => nav.name === "root")[0]}
              changeLanguage={context.changeLanguage}
            />
          );
        }}
      </LocaleContext.Consumer>
    </LocaleContextProvider>
  );
}
