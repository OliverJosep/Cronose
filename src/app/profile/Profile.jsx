import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Rater from "react-rater";
import { LocaleContext } from "../../contexts/LocaleContext";
import Translate from "../../translations/Translate";
import ProfileCard from "./ProfileCard";
import Loader from "../components/Loader";
import UserAvatar from "../components/Avatar";
import { NavLink } from "react-router-dom";
import { MdAddBox } from "react-icons/md";

const Profile = ({ match }) => {
  const context = useContext(LocaleContext);

  const [user, setUser] = useState();
  const [offers, setOffers] = useState();
  const [loaded, setLoaded] = useState(false);

  const { initials, tag } = match.path === "/me" ? context.user : match.params;

  useEffect(() => {
    const getUserProfile = () => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/user/${initials}/${tag}`
      ).then((response) => {
        setUser(response.data);
        getOffers(response.data.id);
      });
    };

    const getOffers = (user_id) => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/offers/user/${user_id}`
      ).then((response) => {
        setOffers(response.data);
        setLoaded(true);
      });
    };

    getUserProfile();
  }, [context.lang, initials, tag]);

  if (!loaded) return <Loader />;
  return (
    <LocaleContext.Consumer>
      {(context) => {
        return (
          <div className="profile">
            <div className="img-back-profile">
              <img src="/assets/img/img-profile.jpg" alt="" className="" />
            </div>
            <div id="head-profile">
              <div className="row row-profile-name">
                <div className="col-md-6 d-flex justify-content-md-start justify-content-center">
                  <div className="img-profile">
                    <UserAvatar
                      name={user.full_name}
                      avatar={user.avatar}
                      size={110}
                    />
                    <h5>
                      {user.name ? user.full_name + " | " : ""} {user.initials}
                      <p className="d-inline text-muted">#{user.tag}</p>
                    </h5>
                  </div>
                </div>
                <div
                  id="profile-average"
                  className="col-md-6 mt-3 d-flex justify-content-end"
                >
                  <p>RATE AVERAGE</p>
                  <Rater total={5} rating={3} interactive={false} />
                </div>
              </div>
              <div className="d-flex justify-content-md-end justify-content-center">
                {context.user.id === user.id ? (
                  <NavLink to={`/me/edit`} className="btn pl-4 pr-4">
                    Edit
                  </NavLink>
                ) : (
                  <NavLink to={`/chat?id=${user.id}`} className="btn pl-4 pr-4">
                    Contact
                  </NavLink>
                )}
              </div>
            </div>
            <div id="body-profile">
              <div className="progress md-progress mt-4 mb-4">
                <h5 className="pr-4">
                  Lvl : <b>3</b>
                </h5>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  25%
                </div>
              </div>
              <div className="card card-about">
                <div className="card-header">
                  <h3>
                    <b>ABOUT ME</b>
                  </h3>
                </div>

                <div className="card-body">
                  <p className="card-text">
                    {user.description ? (
                      user.description[0].description
                    ) : (
                      <Translate string={"no-description"} />
                    )}
                  </p>
                </div>
              </div>
              <div className="profile-offers mb-3">
                <h3>
                  <b>My Offers</b>
                </h3>
                <div className="offers text-center">
                  {offers.map((offer, index) => (
                    <ProfileCard key={index} offer={offer} user={offers.user} />
                  ))}
                </div>
                <div className="icon-more text-center ">
                  {context.user.id === user.id && (
                    <NavLink to="/newoffer">
                      <MdAddBox />
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </LocaleContext.Consumer>
  );
};

export default Profile;
