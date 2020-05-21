import React, { Component } from "react";
import OfferCard from "./OfferCard";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";
import { NavLink } from "react-router-dom";

export default class MyOffers extends Component {
  static contextType = LocaleContext;
  constructor(props) {
    super(props);
    this.state = {
      lang: null,
      offers: null,
    };
    this.getOffers = this.getOffers.bind(this);
  }

  componentDidMount() {
    this.setState({ lang: this.context.lang });
    this.getOffers();
  }

  componentDidUpdate() {
    if (this.state.lang !== this.context.lang) {
      this.getOffers();
      this.setState({ lang: this.context.lang });
    }
  }

  getOffers() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/${this.context.lang}/offers/user/${this.context.user.id}/all`
    ).then((response) => this.setState({ offers: response.data }));
  }

  render() {
    if (!this.state.offers) return <>loading</>;
    return (
      <>
        <div className="text-right pt-4 mr-4">
          <a href="/wallet" className="btn">
            WORK HISTORY
          </a>
        </div>
        <div className="text-center pt-2">
          <h1>My Offers</h1>
        </div>
        <section className="works">
          {console.log(this.state.offers)}
          {this.state.offers.offers.map((offer, index) => (
            <OfferCard
              key={index}
              offer={offer}
              offerUser={this.context.user}
              user={this.context.user}
            />
          ))}
        </section>
        <div className="text-center">
          <NavLink to="/newoffer" className="btn btn-lg mb-4">
            NEW OFFER
          </NavLink>
        </div>
      </>
    );
  }
}
