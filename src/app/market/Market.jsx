import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import OfferCard from "../offers/OfferCard";
import { LocaleContext } from "../../contexts/LocaleContext";

const Market = () => {
  const context = useContext(LocaleContext);

  const [offers, setOffers] = useState();
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [specializations, setSpecializations] = useState();
  const [selectedSpecialization, setSelectedSpecialization] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    // Get all categories
    const getCategories = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/categories`
      );
      setCategories(response.data);
    };

    getCategories();
  }, [context.lang]);

  useEffect(() => {
    // Get specializations
    const getSpecializations = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/category/${selectedCategory}`
      );
      setSpecializations(response.data);
    };

    getSpecializations();
  }, [context.lang, selectedCategory]);

  useEffect(() => {
    const getFilteredOffers = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/offers/filter`,
        {
          params: {
            category: selectedCategory,
            specialization: selectedSpecialization,
            text: text,
            langs: context.lang,
            defaultLang: context.lang,
          },
        }
      );
      setOffers(response.data);
    };

    getFilteredOffers();
  }, [context.lang, selectedCategory, selectedSpecialization, text]);

  const resetFilter = () => {
    setCategories();
    setSelectedCategory();
    setSelectedSpecialization();
    setSpecializations();
  };

  return (
    <>
      <div className="btn-search md-form mt-0">
        <input
          className="form-control"
          type="text"
          id="search"
          onChange={({ target }) => setText(target.value)}
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <section className="works">
        {offers &&
          offers.map((offer, index) => <OfferCard key={index} offer={offer} />)}
      </section>
      <input type="checkbox" name="toggle" id="filter-toggle"></input>
      <label htmlFor="filter-toggle" id="btn-filter">
        <IoIosArrowDropleftCircle />
      </label>
      <div className="filter">
        <h2 className="p-3 pt-4 text-center">Job Filter</h2>
        <div className="input-group p-2">
          <div className="p-2 pt-4">
            <label htmlFor="category">Category</label>
            <select
              id="category_id"
              name="category_id"
              className="rowser-default custom-select"
              onChange={({ target }) => setSelectedCategory(target.value)}
              defaultValue="0"
              required
            >
              <option value="0">Select category</option>
              {categories &&
                categories.map((category) => (
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
              onChange={({ target }) => setSelectedSpecialization(target.value)}
              defaultValue="0"
              required
            >
              <option value="0">Select specialization</option>
              {specializations &&
                specializations.map((specialization) => (
                  <option value={specialization.id} key={specialization.id}>
                    {specialization.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="p-2 pt-4">
            <button
              id="btn-reset"
              onClick={resetFilter}
              className="btn text-white"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;