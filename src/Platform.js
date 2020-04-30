import React, { Component } from 'react';
import HomePage from './components/homepage/Homepage';
import App from './components/app/App';

import navigators from './configs/navigators.js';
import LoginContextProvider, { LoginContext } from './contexts/LoginContext';
import { LocaleContext } from './contexts/LocaleContext';

export default class Platform extends Component {
  constructor(props){
		super(props);
		let avaliableLangs = ['ca','es','en'];
		let defaulLang = avaliableLangs.includes(window.navigator.language.slice(0, 2)) ? window.navigator.language.slice(0, 2) : 'es';
		this.state = {
			lang: avaliableLangs.includes(localStorage.getItem('lang')) ? localStorage.getItem('lang') : defaulLang,
		};
  }

	changeLanguage = ({ currentTarget: { id } }) => {
		localStorage.setItem('lang', id);
		this.setState({
			lang: id,
		});
	};
	
	render() {
		return (
			<LocaleContext.Provider value={this.state.lang}>
				<LoginContextProvider>
					<LoginContext.Consumer>
						{(context) => {
							if (context.isLogged) {
								return (
									<App
										navigator={navigators.filter((nav) => nav.name === 'app')[0]}
										lang={this.state.lang}
										changeLanguage={this.changeLanguage}
									/>
								);
							}
							return (
								<HomePage 
									navigator={navigators.filter((nav) => nav.name == 'root')[0]} 
									lang={this.state.lang}
									changeLanguage={this.changeLanguage}
								/>
							);
						}}
					</LoginContext.Consumer>
				</LoginContextProvider>
			</LocaleContext.Provider>
		);
	}
}
