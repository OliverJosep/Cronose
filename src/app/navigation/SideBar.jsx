import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { LocaleContext } from "../../contexts/LocaleContext";
import Translate from "../../translations/Translate";
import SwitchRoutes from "./Switch";
import Footer from "../components/Footer";
import ScrollToTop from "./ScrollToTop";
import { FaPowerOff } from "react-icons/fa";

const SideBar = ({ routes }) => {
  return (
    <Router>
      <ScrollToTop />
      <input type="checkbox" name="toggle" id="sidebar-toggle"></input>
      <nav className="sidebar-nav">
        <section className="navbar">
          <label htmlFor="sidebar-toggle" className="menu-icon">
            <i className="hamburger"></i>
          </label>
          <img
            className="img-logo mx-auto"
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
          </ul>
        </section>
        <LocaleContext.Consumer>
          {(context) => (
            <>
              <span className="coins-sidebar">{context.user.coins}</span>
              <FaPowerOff
                onClick={() => context.logout()}
                className="icon-logout"
              />
            </>
          )}
        </LocaleContext.Consumer>
      </nav>
      <main className="">
        <SwitchRoutes routes={routes} />
      </main>
      <Footer />
    </Router>
  );
};

export default SideBar;
