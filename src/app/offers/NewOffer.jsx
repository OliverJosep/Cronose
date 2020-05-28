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
  const [url, setUrl] = useState();

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

  const showFileSize = (event) => {
    const maxSize = 1048576; // 1 MB
    const file = event.target.files[0];
    if (isValid(file, maxSize) === true)
      return setUrl(URL.createObjectURL(file));
    setUrl(null);
  };

  const isValid = (img, size) => {
    if (!img) return;
    if (!img.type.match("image/jpeg") && !img.type.match("image/png"))
      return "Invalid image";
    if (size < img.size) return "Max 1 MB";
    return true;
  };

  return (
    <div
      className="langSelector container shadow m-2 p-3 text-center"
      id="offerForm"
    >
      <h5 className="mt-2">Create offer</h5>
      <div id="offerForm2" className="mt-2 container text-left">
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
          <h3>Images</h3>
          <div className="custom-file mb-3">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="filename"
              onChange={(event) => showFileSize(event)}
            />
            {console.log(url)}
            <label className="custom-file-label" htmlFor="customFile">
              Choose file
            </label>
          </div>
          <div className="row d-flex justify-content-center">
            {url && <img className="mb-2 img" src={url} alt="" />}
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
