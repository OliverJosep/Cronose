import React, { useState, useEffect, useContext } from "react";
import { LocaleContext } from "../../contexts/LocaleContext";
import Axios from "axios";
import Translate from "../../translations/Translate";

const EditOffer = ({ match }) => {
  const context = useContext(LocaleContext);

  const specialization_id = match.params.specialization;

  const [translations, setTranslations] = useState();
  const [specialization, setSpecialization] = useState();
  const [visible, setVisible] = useState();

  useEffect(() => {
    const getData = async () => {
      // Get all translations
      const translations_response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/offer/translations`,
        {
          params: {
            user_id: context.user.id,
            specialization_id: specialization_id,
          },
        }
      );

      // Get specialization name
      const specialization_response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/${context.lang}/specialization/${specialization_id}`
      );

      setTranslations(translations_response.data);
      setSpecialization(specialization_response.data);
    };
    getData();
  }, [context.lang, context.user.id, specialization_id]);

  useEffect(() => {
    // Get visibility
    Axios.get(`${process.env.REACT_APP_API_URL}/offer/visible`, {
      params: {
        user_id: context.user.id,
        specialization_id: specialization_id,
      },
    }).then((response) => setVisible(response.data));
  }, [context.user, specialization_id]);

  const updateTranslations = (e, lang) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("user_id", context.user.id);
    formData.set("specialization_id", specialization_id);
    formData.set("jwt", context.jwt);
    Axios.post(`${process.env.REACT_APP_API_URL}/offer/translations`, formData);
  };

  const updateVisibility = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("user_id", context.user.id);
    formData.set("specialization_id", specialization_id);
    formData.set("jwt", context.jwt);
    Axios.post(`${process.env.REACT_APP_API_URL}/offer/switch`, formData);
  };

  const { user } = context;
  return (
    <div className="container edit_profile">
      <h1 className="text-center mt-4">Edit Offer</h1>
      <div className="mt-4 mb-4 box">
        <div className="title p-2">
          {specialization && specialization.name} |{" "}
          <span className="user">
            {user.initials}#<span className="text-muted">{user.tag}</span>
          </span>
        </div>
        <div className="body edit_offer">
          {translations &&
            translations.map((translation, index) => (
              <form
                id="translations_form"
                method="post"
                target="_self"
                className="form-signin"
                onSubmit={updateTranslations}
                key={index}
              >
                <div className="row text-center pt-4">
                  <div className="col-12">
                    <h4>
                      <Translate string={translation.language_id} />
                    </h4>
                    <input
                      id="lang"
                      name="lang"
                      defaultValue={translation.language_id}
                      readOnly
                      type="hidden"
                    />
                  </div>
                </div>
                <div className="row pt-2 mb-2">
                  <div className="col-3 text-right pr-3">
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="col-7">
                    <input
                      id="title"
                      name="title"
                      className="form-control mb-3"
                      type="text"
                      defaultValue={translation.title}
                    />
                  </div>
                  <div className="col-3 text-right pr-3">
                    <label htmlFor="description"> Description</label>
                  </div>
                  <div className="col-7">
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      defaultValue={translation.description}
                    />
                  </div>
                </div>
                <div className="text-center bottom m-2 ml-4 mr-4">
                  <input
                    className="btn btn-register mt-3 mb-2 text-center text-white"
                    type="submit"
                    value="Update"
                  />
                </div>
              </form>
            ))}
          <form
            id="visiblity_form"
            method="post"
            target="_self"
            className="form-signin"
            onSubmit={updateVisibility}
          >
            <div className="row text-center pt-4">
              <div className="col-12">
                <h4>Visible</h4>
                {console.log(visible)}
                {visible ? (
                  <input
                    type="checkbox"
                    id="visible"
                    name="visible"
                    defaultChecked={visible.visibility === "1"}
                  />
                ) : (
                  <>Loading</>
                )}
              </div>

              <div className="col-12">
                <input
                  className="btn btn-register mt-3 mb-2 text-center text-white"
                  type="submit"
                  value="Update"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOffer;
