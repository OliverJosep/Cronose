import React, { createContext, Component } from 'react';
import Axios from 'axios';
import qs from 'qs';

export const LocaleContext = createContext();

export default class LocaleContextProvider extends Component {
	constructor(props) {
		super(props);

		let avaliableLangs = ['ca','es','en'];
		let defaulLang = avaliableLangs.includes(window.navigator.language.slice(0, 2)) ? window.navigator.language.slice(0, 2) : 'es';
		// let lang = avaliableLangs.includes(localStorage.getItem('app').lang) ? localStorage.getItem('app').lang : defaulLang;
		this.state = JSON.parse(localStorage.getItem('app')) || {
			lang: defaulLang,
			user: {},
			jwt: ''
		};
		
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.changeLanguage = this.changeLanguage.bind(this);
		this.saveLocalStorage = this.saveLocalStorage.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	componentDidMount() {
		// // this.login(localStorage.get('jwt'));
		// const app = JSON.parse(localStorage.getItem('app'));
		
		// console.log(app.jwt);
	}

	login(data) {
		const self = this;
		console.log(data);
		Axios.post(`${process.env.REACT_APP_API_URL}/login`, qs.stringify(data))
			.then(function(response) {
				self.setState({
					user: response.data.user,
					jwt: response.data.jwt
				});
			})
			.catch(function(error) {
				self.logout(error);
			})
			.finally(function() {
				self.saveLocalStorage();
			});
	}

	updateUser(id) {
		const self = this;
		Axios.get(`${process.env.REACT_APP_API_URL}/user/id/${id}`)
		.then(function(response) {
			self.setState({
				user: response.data
			})
		})
		.finally(function() {
			self.saveLocalStorage();
		});

	}

	logout(error) {
		this.setState({ user: {},lang: this.state.lang , jwt: {}, isLogged: false }, () => {
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
			localStorage.setItem('app', JSON.stringify({jwt: this.state.jwt, lang: this.state.lang}));
		}, 100);

		// 	localStorage.setItem('app', JSON.stringify({lang: this.state.lang,jwt: this.state.jwt}));
		// }, 100);
	}

	render() {
		return (
			<LocaleContext.Provider 
				value={{ lang: this.state.lang, jwt: this.state.jwt, user:this.state.user, login: this.login, logout: this.logout, changeLanguage: this.changeLanguage, updateUser: this.updateUser }}>
			
				{this.props.children}
			</LocaleContext.Provider>
		);
	}
}
