import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Footer from "./Footer";
import { FaPowerOff } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { LocaleContext } from "../../contexts/LocaleContext";
import Translate from "../../translations/Translate";

function NavBar(props) {
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
            {props.routes.map(function (route, index) {
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
      <main className="w-100">{SwitchRoutes(props.routes, props)}</main>
      <Footer lang={props.lang} changeLanguage={props.changeLanguage} />
    </Router>
  );
}

function SideBar(props) {
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
            {props.routes.map(function (route, index) {
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
      <main className="">{SwitchRoutes(props.routes, props)}</main>
      <Footer lang={props.lang} changeLanguage={props.changeLanguage} />
    </Router>
  );
}

function SwitchRoutes(routes, props) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}

export { NavBar, SideBar };
