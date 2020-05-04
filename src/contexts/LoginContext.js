import React, { createContext, Component } from 'react';
import Axios from 'axios';
import qs from 'qs';

export const LoginContext = createContext();

export default class LoginContextProvider extends Component {
	constructor(props) {
		super(props);

		let avaliableLangs = ['ca','es','en'];
		let defaulLang = avaliableLangs.includes(window.navigator.language.slice(0, 2)) ? window.navigator.language.slice(0, 2) : 'es';

		this.state = JSON.parse(localStorage.getItem('login')) || {
			user: {},
			lang: avaliableLangs.includes(localStorage.getItem('lang')) ? localStorage.getItem('lang') : defaulLang,
			jwt: '',
			isLogged: false,
		};

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.saveLocalStorage = this.saveLocalStorage.bind(this);
	}

	login(data) {
		const self = this;
		Axios.post(`${process.env.REACT_APP_API_URL}/login`, qs.stringify(data))
			.then(function(response) {
				self.setState({
					user: response.data.user,
					jwt: response.data.jwt,
					isLogged: true,
				});
			})
			.catch(function(error) {
				self.logout(error);
			})
			.finally(function() {
				self.saveLocalStorage();
			});
		return this.state.isLogged;
	}

	logout(error) {
		this.setState({ user: {},lang: this.state.lang , jwt: {}, isLogged: false }, () => {
			this.saveLocalStorage();
		});
	}

	saveLocalStorage() {
		localStorage.setItem('login', JSON.stringify(this.state));
	}

	render() {
		return (
			<LoginContext.Provider
				value={{ ...this.state, login: this.login, logout: this.logout }}>
				{this.props.children}
			</LoginContext.Provider>
		);
	}
}
