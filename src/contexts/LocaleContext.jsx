import React, { createContext, Component } from "react";
import Axios from "axios";
import qs from "qs";

export const LocaleContext = createContext();

export default class LocaleContextProvider extends Component {
  constructor(props) {
    super(props);

    const avaliableLangs = ["ca", "es", "en"];
    const defaulLang = avaliableLangs.includes(
      window.navigator.language.slice(0, 2)
    )
      ? window.navigator.language.slice(0, 2)
      : "es";

    this.state = JSON.parse(localStorage.getItem("app")) || {
      lang: defaulLang,
      user: null,
      jwt: "",
      error: "",
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  login(data) {
    const self = this;
    Axios.post(`${process.env.REACT_APP_API_URL}/login`, qs.stringify(data))
      .then(function (response) {
        response.data.message
          ? self.setState({ user: response.data.message })
          : self.setState(
              {
                user: response.data.user,
                jwt: response.data.jwt,
              },
              function () {
                self.saveLocalStorage();
              }
            );
      })
      .catch(function (error) {
        console.log(error.message);
        self.logout(error);
      });
    // .finally(function () {
    //   self.saveLocalStorage();
    // });
  }

  updateUser(id) {
    const self = this;
    Axios.get(`${process.env.REACT_APP_API_URL}/user/id/${id}`)
      .then(function (response) {
        self.setState({
          user: response.data,
        });
      })
      .finally(function () {
        self.saveLocalStorage();
      });
  }

  logout(error) {
    this.setState({ user: null, lang: this.state.lang, jwt: {} }, () => {
      this.saveLocalStorage();
    });
  }

  changeLanguage = ({ currentTarget: { id } }) => {
    this.setState({
      lang: id,
    });
    this.saveLocalStorage();
  };

  saveLocalStorage() {
    setTimeout(() => {
      localStorage.setItem(
        "app",
        JSON.stringify({ jwt: this.state.jwt, lang: this.state.lang })
      );
    }, 100);
  }

  render() {
    return (
      <LocaleContext.Provider
        value={{
          lang: this.state.lang,
          jwt: this.state.jwt,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          changeLanguage: this.changeLanguage,
          updateUser: this.updateUser,
        }}
      >
        {this.props.children}
      </LocaleContext.Provider>
    );
  }
}
