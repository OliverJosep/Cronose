import React, { Component } from "react";
import Axios from "axios";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import OfferCard from "./OfferCard";
import qs from "qs";
import { LocaleContext } from "../../contexts/LocaleContext";
import Loader from "../layouts/Loader";

export default class Market extends Component {
  static contextType = LocaleContext;
  constructor(props) {
    super(props);
    this.state = {
      lang: [],
      offers: [],
      categories: [],
      selected_category: 0,
      specialization: [],
      loaded: false,
    };

    this.getOffers = this.getOffers.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getSpecialization = this.getSpecialization.bind(this);
    this.getFilteredOffers = this.getFilteredOffers.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentDidMount() {
    this.setState({ lang: this.context.lang });

    this.getOffers();
    this.getCategories();
  }

  componentDidUpdate() {
    if (this.state.lang !== this.context.lang) {
      this.getCategories();
      this.state.selected_category === 0
        ? this.getOffers()
        : this.getSpecialization();
      this.setState({ lang: this.context.lang });
    }
  }

  // Get Offers

  getOffers() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/${this.context.lang}/offers/all/0/10`
    ).then((response) =>
      this.setState({
        offers: response.data || this.state.offers,
        loaded: true,
      })
    );
  }

  // Fliter

  getFilteredOffers() {
    const category_id = document.getElementById("category_id").value;
    const specialization_id =
      category_id !== "0"
        ? document.getElementById("specialization_id").value
        : "";

    const string = document.getElementById("search").value;

    Axios.post(
      `${process.env.REACT_APP_API_URL}/job-offers/filter`,
      qs.stringify({
        filter: {
          category: category_id,
          specialization: specialization_id,
          string: string,
          defaultLang: this.context.lang,
        },
      })
    ).then((response) => this.setState({ offers: response.data }));
  }

  resetFilter() {
    this.setState({ categories: [], specialization: [], selected_category: 0 });
    this.getOffers();
    this.getCategories();
  }

  // Get category and specialization

  getCategories() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/${this.context.lang}/categories`
    ).then((response) => this.setState({ categories: response.data }));
  }

  getSpecialization() {
    const category_id = document.getElementById("category_id").value;
    this.setState({ selected_category: category_id });
    Axios.get(
      `${process.env.REACT_APP_API_URL}/${this.context.lang}/category/${category_id}`
    ).then((response) => this.setState({ specialization: response.data }));
    this.getFilteredOffers();
  }

  render() {
    if (!this.state.loaded)
      return (
        <>
          <Loader />
        </>
      );
    return (
      <>
        <div className="btn-search md-form mt-0">
          <input
            className="form-control"
            type="text"
            id="search"
            onChange={this.getFilteredOffers}
            placeholder="Search"
            aria-label="Search"
          ></input>
        </div>
        <section className="works">
          {this.state.offers.map((offer, index) => (
            <OfferCard
              key={index}
              offer={offer}
              translations={offer.translations}
              user={this.context.user}
            />
          ))}
        </section>
        <input type="checkbox" name="toggle" id="filter-toggle"></input>
        <label htmlFor="filter-toggle" id="btn-filter">
          <IoIosArrowDropleftCircle />
        </label>
        {/* <span id='btn-show' >
				</span> */}

        <div className="filter">
          <span id="btn-hide">{/* <IoIosArrowDroprightCircle /> */}</span>
          <h2 className="p-3 pt-4 text-center">Job Filter</h2>
          <div className="input-group p-2">
            <div className="p-2 pt-4">
              <label htmlFor="category">Category</label>
              <select
                id="category_id"
                name="category_id"
                className="rowser-default custom-select"
                onChange={this.getSpecialization}
                defaultValue="0"
                required
              >
                <option value="0">Select category</option>
                {this.state.categories.map((category, index) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2 pt-4">
              <label htmlFor="specialization">Specialization</label>
              <select
                id="specialization_id"
                name="specialization_id"
                className="rowser-default custom-select"
                onChange={this.getFilteredOffers}
                defaultValue="0"
                required
              >
                <option value="0">Select specialization</option>
                {this.state.specialization.map((specialization, index) => (
                  <option value={specialization.id}>
                    {specialization.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2 pt-4">
              <button
                id="btn-reset"
                onClick={this.resetFilter}
                className="btn text-white"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
