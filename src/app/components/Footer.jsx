import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoLogoTwitter, IoLogoFacebook, IoLogoInstagram } from "react-icons/io";
import LanguagePicker from "./LanguagePicker";
import { LocaleContext } from "../../contexts/LocaleContext";

const Footer = () => {
  const context = useContext(LocaleContext);
  return (
    <footer className="page-footer p-4">
      <LanguagePicker changeLanguage={context.changeLanguage} />
      <div className="links row text-center">
        <div className="col-md-6 text-md-left">
          <p>
            <NavLink to="/">Home</NavLink>
          </p>
          <p>
            <NavLink to="/#about">About Us</NavLink>
          </p>
          <p>
            <NavLink to="/#HowItWorks">How it work</NavLink>
          </p>
          <p>
            <NavLink to="/#contact">Contact</NavLink>
          </p>
        </div>
        <div className="col-md-6 text-md-left">
          <p>
            <NavLink to="/#">FAQ</NavLink>
          </p>
          <p>
            <NavLink to="/#">Terms & Conditions</NavLink>
          </p>
          <p>
            <NavLink to="/#">Help & Support</NavLink>
          </p>
          <p>
            <NavLink to="/#">Team</NavLink>
          </p>
        </div>
        <div className="newsletter col-md-6">
          <form>
            <div className="form-inline justify-content-center justify-content-md-start">
              <input
                type="email"
                className="form-control mr-sm-2"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <button type="submit" className="btn-submit btn my-2 my-sm-0">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="social col-md-6 text-md-left">
          <a href="https://twitter.com/">
            <IoLogoTwitter />
          </a>
          <a href="https://es-es.facebook.com/">
            <IoLogoFacebook />
          </a>
          <a href="https://www.instagram.com/?hl=es">
            <IoLogoInstagram />
          </a>
        </div>
        <div className="col-12">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://cronose.com"> cronose.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
