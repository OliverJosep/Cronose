import React, { useState, useEffect } from "react";
import Axios from "axios";
import md5 from "md5";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";

const Register = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [url, setUrl] = useState(null);
  const [dni, setDni] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [r_password, setR_password] = useState(null);
  const [registered, setRegistered] = useState(null);

  useEffect(() => {
    const getProvinces = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/provinces`)
        .then((response) => setProvinces(response.data))
        .catch((err) => console.error(err));
    };
    getProvinces();
  }, []);

  const register = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("password", md5(formData.get("password")));
    formData.set("r_password", md5(formData.get("r_password")));
    if (
      dni === true &&
      email === true &&
      password === true &&
      r_password === true
    ) {
      Axios.post(`${process.env.REACT_APP_API_URL}/register`, formData)
        .then((response) => {
          response.data !== null && setRegistered(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const getCities = () => {
    const province_id = document.getElementById("province_id").value;
    Axios.get(`${process.env.REACT_APP_API_URL}/cities/${province_id}`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((err) => console.error(err));
  };

  const updateAvatar = () => {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const surname_2 = document.getElementById("surname_2").value;
    setAvatar(`${name} ${surname} ${surname_2}`);
  };

  const showFileSize = (event) => {
    const maxSize = 1048576; // 1 MB
    const file = event.target.files[0];
    if (isValid(file, maxSize) === true)
      return setUrl(URL.createObjectURL(file));
    document.getElementById("avatar").value = null;
    setUrl(null);
  };

  const isValid = (img, size) => {
    if (!img) return;
    if (!img.type.match("image/jpeg") && !img.type.match("image/png"))
      return "Invalid image";
    if (size < img.size) return "Max 1 MB";
    return true;
  };

  const validDNI = () => {
    let dni = document.getElementById("dni").value;
    if (/(^[0-9]{8,8})([a-zA-Z])$$/.test(dni)) {
      Axios.get(`${process.env.REACT_APP_API_URL}/dni`, {
        params: {
          dni: dni,
        },
      }).then((response) => {
        response.data === true
          ? setDni("This dni already exists!")
          : setDni(true);
      });
    } else {
      setDni("Invalid DNI!");
    }
  };

  const validPassword = () => {
    const password = document.getElementById("password").value;
    password.length < 5 ? setPassword("Min 5 characters!") : setPassword(true);
  };

  const validR_password = () => {
    const password = md5(document.getElementById("password").value);
    const r_password = md5(document.getElementById("r_password").value);
    password !== r_password
      ? setR_password("The passwords are differents!")
      : setR_password(true);
  };

  const validEmail = () => {
    const email = document.getElementById("email").value;
    if (
      /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
        email
      )
    ) {
      Axios.get(`${process.env.REACT_APP_API_URL}/email`, {
        params: {
          email: email,
        },
      }).then((response) => {
        if (response.data === true) setEmail("This email already exists!");
        if (response.data === false) setEmail(true);
      });
    } else {
      setEmail("Invalid Email!");
    }
  };
  return (
    <div className="jumbotron">
      <section className="register signin container p-5 bg-white">
        <h1 className="mb-4">Register</h1>
        <form
          id="register_form"
          method="post"
          target="_self"
          className="form-signin"
          onSubmit={register}
        >
          <div className="row">
            <div className="form-group col-12 col-md-6 p-1">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={updateAvatar}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6 p-1">
              <label htmlFor="surname">Surname:</label>
              <input
                id="surname"
                type="text"
                name="surname"
                className="form-control"
                placeholder="Your first surname"
                onChange={updateAvatar}
                required
              />
            </div>
            <div className="form-group col-md-6 p-1">
              <label htmlFor="surname_2">
                Surname 2: <small className="text-muted">Optional</small>
              </label>
              <input
                id="surname_2"
                type="text"
                name="surname_2"
                className="form-control"
                placeholder="Your second surname"
                onChange={updateAvatar}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-3 p-1">
              <label htmlFor="dni">DNI:</label>
              {dni && <span className="ml-1 error">{dni}</span>}
              <input
                id="dni"
                type="text"
                name="dni"
                className="form-control"
                placeholder="National document"
                onBlur={validDNI}
                required
              />
            </div>
            <div className="form-group col-md-9 p-1">
              <label htmlFor="email">Email:</label>
              {email && <span className="ml-1 error">{email}</span>}
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="example@email.com"
                onBlur={validEmail}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-label-group col-md-6 p-1">
              <label htmlFor="province_id">Province</label>
              <select
                id="province_id"
                name="province_id"
                className="form-control"
                onChange={getCities}
                defaultValue="0"
                required
              >
                <option value="0">Select province</option>
                {provinces.map((province, index) => (
                  <option value={province.id} key={index}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-label-group col-md-6 p-1">
              <label htmlFor="city_cp">City</label>
              <select
                id="city_cp"
                name="city_cp"
                className="form-control"
                defaultValue="0"
                required
              >
                <option value="0" disabled>
                  Select City
                </option>
                {cities.map((cities, index) => (
                  <option value={cities.cp} key={index}>
                    {cities.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-label col p-1">
                <label htmlFor="password">Password</label>
                {password && <span className="ml-1 error">{password}</span>}
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  onChange={validPassword}
                  required
                />
              </div>
              <div className="form-label-group col p-1">
                <label htmlFor="r_password">Repeat password</label>
                {r_password && <span className="ml-1 error">{r_password}</span>}
                <input
                  id="r_password"
                  type="password"
                  name="r_password"
                  className="form-control"
                  placeholder="password"
                  onChange={validR_password}
                  required
                />
              </div>
            </div>
            <div className="col-12 col-md-6 pl-3">
              <div className="row m-0">
                <div className="form-group col-12 col-md-6 p-1">
                  <label htmlFor="avatar">Avatar</label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    className="form-control-file"
                    onChange={(event) => showFileSize(event)}
                  />
                </div>
                <div className="col-12 col-md-6 text-center">
                  {url ? (
                    <Avatar
                      src={url}
                      size={150}
                      round={true}
                      className="mr-2"
                    />
                  ) : (
                    <Avatar
                      name={avatar}
                      size={150}
                      round={true}
                      className="mr-2"
                    />
                  )}
                </div>
              </div>

              {/* <div className="form-group col p-1">
                <label htmlFor="dni_img">DNI</label>
                <input
                  id="dni_img"
                  type="file"
                  name="dni_img"
                  className="form-control-file"
                  required
                />
              </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
              <div className="form-label-group col-12">
                <input id="private" name="private" type="checkbox" />
                <label className="ml-2" htmlFor="private">
                  Private account
                </label>
              </div>
              <div className="form-label col-12">
                <input
                  id="terms_and_conditions"
                  name="terms_and_conditions"
                  type="checkbox"
                />
                <label className="ml-2" htmlFor="terms_and_conditions">
                  Accept the
                  <NavLink
                    to={`/#`}
                    data-toggle="modal"
                    data-target="#termsAndConds"
                  >
                    &nbsp;terms and conditions
                  </NavLink>
                </label>
              </div>
            </div>
            <div className="col">
              <input
                className="btn btn-lg btn-register w-100 mt-3 text-white"
                type="submit"
                value="Submit"
              />
              {registered === true && (
                <span className="registered">Registered succesfully!!</span>
              )}
              <div className="form-label-group col-12 mt-2">
                <label className="ml-2" htmlFor="terms_and_conditions">
                  You already have an account? Please
                  <NavLink to="/login" activeClassName="active">
                    &nbsp;log in!
                  </NavLink>
                </label>
              </div>
            </div>
          </div>
          <div
            className="modal fade bannerformmodal bd-example-modal-sm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="bannerformmodal"
            aria-hidden="true"
            id="termsAndConds"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h4 className="modal-title mb-4">
                  Condiciones generales de Cronose
                </h4>
                <p>
                  1. ACTIVIDAD. Cronose C.B (en adelante la página) no se hace
                  responsable del uso que los usuarios hagan de la misma. Sin
                  embargo, se reserva el derecho de tomar las medidas que
                  considere oportunas en la gestión de éstos, pudiendo sus
                  perfiles ser borrados sin previo aviso ni derecho a
                  compensación alguna.
                </p>
                <p>
                  2. PRECIO. El ratio de precios por hora de las actividades es
                  susceptible de ser modificado.
                </p>
                <p>
                  4. BAJA O CANCELACIÓN. Los perfiles de usuarios nunca se
                  borrarán complemtamente. En caso de desear eliminar el perfil
                  simplemente se ocultará al resto de usuarios, pero en
                  cualquier momento se podrá dar de alta de nuevo.
                </p>
                <p>
                  4.1 La página podrá impedir el acceso de los usuarios que
                  considere que no permiten el desarrollo de las actividades. La
                  expulsión no da lugar a devolución ni total ni parcial de la
                  cuota mensual en caso de ser usuario <em>premium</em>.
                </p>
                <p>
                  4.2 El contratante declara expresamente que las informaciones
                  facilitadas en la inscripción son verdaderas y exactas. Toda
                  omisión o información errónea puede dar lugar a la expulsión
                  inmediata de la página.
                </p>
                <p>
                  5. JURISDICCIÓN Y RÉGIMEN LEGAL APLICABLE. En relación a toda
                  cuestión litigiosa que surja en relación con el presente
                  contrato o relación jurídica, las partes y de mutuo acuerdo
                  renuncian a su fuero propio si lo tuvieran, sometiéndose al de
                  los Juzgados y Tribunales de la ciudad de Palma de Mallorca.
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
