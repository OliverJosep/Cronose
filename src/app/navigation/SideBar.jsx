import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { LocaleContext } from "../../contexts/LocaleContext";
import Translate from "../../translations/Translate";
import SwitchRoutes from "./Switch";
import Footer from "../components/Footer";
import { FaPowerOff } from "react-icons/fa";

const SideBar = ({ routes }) => {
  return (
    <Router>
      <input type="checkbox" name="toggle" id="sidebar-toggle"></input>
      <nav className="sidebar-nav">
        <section className="navbar">
          <label htmlFor="sidebar-toggle" className="menu-icon">
            <i className="hamburger"></i>
          </label>
          <img
            className="img-logo m-auto mt-4"
            src="/assets/img/svg/logo.svg"
            alt="logo"
          />
          <ul className="nav flex-column mb-0 mt-4">
            {routes.map(function (route, index) {
              if (route.show === false) return false;
              return (
                <li key={index} className="nav-item">
                  <NavLink
                    to={route.path}
                    exact={route.exact}
                    className=""
                    activeClassName="active"
                  >
                    <i className="icon">{route.icon ? <route.icon /> : null}</i>
                    <p>
                      <Translate string={route.title} />
                    </p>
                  </NavLink>
                </li>
              );
            })}
            <LocaleContext.Consumer>
              {(context) => (
                <i
                  id="iconDown"
                  className="mt-5"
                  onClick={() => context.logout()}
                >
                  <FaPowerOff />
                </i>
              )}
            </LocaleContext.Consumer>
          </ul>
        </section>
      </nav>
      <main className="">
        <SwitchRoutes routes={routes} />
      </main>
      <Footer />
    </Router>
  );
};

export default SideBar;
