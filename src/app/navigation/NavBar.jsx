import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Translate from "../../translations/Translate";
import SwitchRoutes from "./Switch";
import Footer from "../components/Footer";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({ routes }) => {
  return (
    <Router>
      <nav className="navbar navbar-expand-xl w-100 container">
        <div>
          <img className="img-logo" src="/assets/img/svg/logo.svg" alt="logo" />
          <NavLink className="pl-3 navbar-brand" to="/">
            Cronose
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <GiHamburgerMenu />
          </span>
        </button>
        <div
          className="h-nav collapse navbar-collapse text-left mr-4 mt-2"
          id="navbarToggler"
        >
          <ul id="ul-nav-hor" className="navbar-nav">
            {routes.map(function (route, index) {
              if (route.show === false) return false;
              return (
                <li key={index} className="item">
                  <NavLink
                    to={route.path}
                    exact={route.exact}
                    className="nav-item mr-1 px-3 py-2"
                    activeClassName="active"
                  >
                    <Translate string={route.title} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <main className="w-100">
        <SwitchRoutes routes={routes} />
      </main>
      <Footer />
    </Router>
  );
};

export default NavBar;
