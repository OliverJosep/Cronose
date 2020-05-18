import React, { Component } from "react";
import Axios from "axios";
import { LocaleContext } from "../../../../contexts/LocaleContext";
import { MdAddCircleOutline } from "react-icons/md";

export default class Cards extends Component {
  static contextType = LocaleContext;
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
    };
    this.getCards = this.getCards.bind(this);
  }

  componentDidUpdate() {
    // this.getCards();
  }

  getCards() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/cards/${this.props.user1}/${this.props.user2}`
    ).then((response) => {
      console.log(response.data);

      this.setState({
        cards: response.data !== [] ? response.data : null,
      });
    });
  }

  noCards() {
    return (
      <div className="text-center mt-3">
        <span>No cards avaliable!</span>
      </div>
    );
  }

  render() {
    return (
      <div className="col-xl-3 col-12 p-1 cards">
        {console.log(this.props)}
        <div className="bg">
          <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
          {this.state.cards === null ? this.noCards() : <spsan>d</spsan>}
          {/* <div className="row offer-card p-2">
            <div className="col-6 text-center d-block d-md-none d-xl-block">
              <img
                className="m-auto"
                src="/assets/img/img-work.jpg"
                width="auto"
                height="71px"
                alt="img-work"
              ></img>
            </div>
            <div className="col-6 col-md-12 col-xl-6 text-md-center text-xl-left">
              <div className="row">
                <div className="col-12 title">Job Title</div>
                <div className="col-12">12/03/2020</div>
                <div className="col-12">
                  <strong>Status:</strong> Pending
                </div>
              </div>
            </div>
          </div>
          <div className="row offer-card p-2">
            <div className="col-6 text-center d-block d-md-none d-xl-block">
              <img
                className="m-auto"
                src="/assets/img/img-work.jpg"
                width="auto"
                height="71px"
                alt="img-work"
              ></img>
            </div>
            <div className="col-6 col-md-12 col-xl-6 text-md-center text-xl-left">
              <div className="row">
                <div className="col-12 title">Job Title</div>
                <div className="col-12">08/03/2020</div>
                <div className="col-12">
                  <strong>Status:</strong> Accepted
                </div>
              </div>
            </div>
          </div> */}
          <div className="text-center mt-2">
            <MdAddCircleOutline className="add" />
          </div>
        </div>
      </div>
    );
  }
}
