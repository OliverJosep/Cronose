import React, { useState, useEffect, useContext } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Axios from "axios";
import { LocaleContext } from "../../contexts/LocaleContext";

const NewOffer = () => {
  const context = useContext(LocaleContext);

  const [categories, setCategories] = useState();
  const [categorySelectet, setCategorySelected] = useState();
  const [specialization, setSpecialization] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    const getCategories = () => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/categories`
      ).then((response) => setCategories(response.data));
    };
    getCategories();
  }, [context.lang]);

  useEffect(() => {
    const getSpecialization = () => {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/category/${categorySelectet}`
      ).then((response) => setSpecialization(response.data));
    };
    getSpecialization();
  }, [context.lang, categorySelectet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("p_val", rating);
    data.set("user_id", context.user.id);
    data.set("jwt", context.jwt);
    Axios.post(
      `${process.env.REACT_APP_API_URL}/${context.lang}/offer`,
      data
    ).then(() => (window.location.href = "/market"));
  };

  return (
    <div
      className="langSelector container shadow m-2 p-3 text-center"
      id="offerForm"
    >
      <h5>¿En qué idioma ofrecerás tu trabajo?</h5>
      <p>Después podrás añadir más idiomas complementarios</p>
      <button
        className="btn btn-lg dropdown-toggle text-white"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Idiomas
      </button>
      <div
        id="langsAvaliable"
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
      ></div>

      <div id="offerForm2" className="container text-left">
        <hr />

        <form method="post" target="_self" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="category">Category</label>
              <select
                id="category_id"
                name="category_id"
                className="rowser-default custom-select"
                onChange={({ target }) => setCategorySelected(target.value)}
                required
              >
                <option value="0" defaultValue="0">
                  Select category
                </option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <small className="form-text text-muted">
                Elige la categoría que mejor se ajuste al trabajo que deseas
                publicar
              </small>
            </div>

            <div className="form-group col">
              <label htmlFor="specialization">Specialization</label>
              <select
                id="specialization_id"
                name="specialization_id"
                className="rowser-default custom-select"
                required
              >
                <option value="0" defaultValue="0">
                  Select specialization
                </option>
                {specialization &&
                  specialization.map((specialization) => (
                    <option value={specialization.id} key={specialization.id}>
                      {specialization.name}
                    </option>
                  ))}
              </select>
              <small className="form-text text-muted">
                Elige la categoría que mejor se ajuste al trabajo que deseas
                publicar
              </small>
            </div>
          </div>
          <div className="form-group bg-secondary text-white p-2">
            <label htmlFor="rating">
              ¿Cuál es tu nivel de profesionalidad en este sector?
            </label>
            <div className="col">
              <Rater
                total={5}
                rating={0}
                onRate={({ rating }) => setRating(rating * 20)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="offerTitle">Título</label>
            <input
              type="text"
              className="form-control"
              name="offerTitle"
              id="offerTitle"
              aria-describedby="emailHelp"
              placeholder="Introduce tu título..."
            />
            <small id="offerSubtitle" className="form-text text-muted">
              Utiliza un título lo más descriptivo posible
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="offerTitle">Descripción</label>
            <textarea
              type="text"
              className="form-control"
              name="offerDescription"
              id="offerDescription"
              aria-describedby="emailHelp"
              placeholder="Describe tu actividad..."
              rows="5"
            ></textarea>
            <small id="offerSubtitle" className="form-text text-muted">
              Indica lo que puedes ofrecer y otra información que quieres que
              sepan los demás usuarios. Una vez creada la oferta, podrá
              registrar más de un idioma.
            </small>
          </div>
          <hr />
          <h3>Horario</h3>
          <div className="row mb-4 mt-1">
            <div className="col-lg-8 my-auto">
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline1"
                />
                <label className="form-check-label" htmlFor="materialInline1">
                  Lunes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline2"
                />
                <label className="form-check-label" htmlFor="materialInline2">
                  Martes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline3"
                />
                <label className="form-check-label" htmlFor="materialInline3">
                  Miércoles
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline3"
                />
                <label className="form-check-label" htmlFor="materialInline3">
                  Jueves
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline3"
                />
                <label className="form-check-label" htmlFor="materialInline3">
                  Viernes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline3"
                />
                <label className="form-check-label" htmlFor="materialInline3">
                  Sábado
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="materialInline3"
                />
                <label className="form-check-label" htmlFor="materialInline3">
                  Domingo
                </label>
              </div>
              <small id="offerSubtitle" className="form-text text-muted">
                Indica los días que puedes reaizar el trabajo.
              </small>
            </div>
            <div className="col-lg-4">
              <div className="form-row">
                <div className="col">
                  <div className="md-form">
                    <label className="form-label" htmlFor="date1">
                      De las{" "}
                    </label>
                    <input
                      type="text"
                      id="date1"
                      className="form-control"
                      placeholder="00:00"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="md-form">
                    <label className="form-label" htmlFor="date2">
                      Hasta las{" "}
                    </label>
                    <input
                      type="email"
                      id="date2"
                      className="form-control"
                      placeholder="00:00"
                    />
                  </div>
                </div>
                <small id="offerSubtitle" className="form-text text-muted">
                  Escribe de que hora a que hora puedes realizar el trabajo
                </small>
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="btn text-white"
            id="generateData"
            value="Publicar"
          />
        </form>
      </div>
    </div>
  );
};

export default NewOffer;
