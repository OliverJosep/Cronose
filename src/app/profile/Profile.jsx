import React, { Component } from "react";
import { MdAddBox } from "react-icons/md";
import { LocaleContext } from "../../contexts/LocaleContext";
import Axios from "axios";
import Rater from "react-rater";
import Translate from "../../translations/Translate";
import ProfileCard from "./ProfileCard";
import Loader from "../components/Loader";
import UserAvatar from "../components/Avatar";
import { NavLink } from "react-router-dom";

export default class Profile extends Component {
  static contextType = LocaleContext;
  constructor(props) {
    super(props);
    this.state = { lang: [], user: [], offers: [], loaded: false };
    this.getOffers = this.getOffers.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount() {
    //Set language
    this.setState((state) => {
      return { lang: this.context.lang };
    });

    //Get data
    this.getUserProfile();
  }

  componentDidUpdate() {
    if (this.state.lang !== this.context.lang) {
      this.setState((state) => {
        return { lang: this.context.lang };
      });
      this.getUserProfile();
    }
  }

  getUserProfile() {
    const { initials, tag } =
      this.props.match.path === "/me"
        ? this.context.user
        : this.props.match.params;
    Axios.get(
      `${process.env.REACT_APP_API_URL}/${this.context.lang}/user/${initials}/${tag}`
    ).then((response) => {
      this.setState({ user: response.data });
      this.getOffers(response.data.id);
    });
  }

  getOffers(user_id) {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/${this.context.lang}/offers/user/${user_id}`
    ).then((response) => {
      this.setState({ offers: response.data, loaded: true });
    });
  }
  render() {
    const { user } = this.state;
    if (!this.state.loaded) return <Loader />;
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
                        size={100}
                      />
                      {/* <img
												src='/assets/img/avatar-placeholder.png'
												alt='...'
												className=' rounded-circle shadow-sm'></img> */}
                      <h5>
                        {user.name ? user.full_name + " | " : ""}{" "}
                        {user.initials}
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
                  {this.context.user.id === user.id ? (
                    <NavLink to={`/me/edit`} className="btn pl-4 pr-4">
                      Edit
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/chat?id=${user.id}`}
                      className="btn pl-4 pr-4"
                    >
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
                <div className="profile-offers">
                  <h3>
                    <b>My Offers</b>
                  </h3>
                  <div className="card-deck text-center">
                    {console.log(this.state.offers)}
                    {this.state.offers.offers.map((offer, index) => (
                      <ProfileCard
                        key={index}
                        offer={offer}
                        user={this.state.offers.user}
                      />
                    ))}
                  </div>
                  <div className="icon-more text-center ">
                    <NavLink to="/newoffer">
                      <MdAddBox />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}
