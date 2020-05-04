import React, { Component } from 'react';
import HomePage from './components/homepage/Homepage';
import App from './components/app/App';

import navigators from './configs/navigators.js';
import LocaleContextProvider, { LocaleContext } from './contexts/LocaleContext';

export default class Platform extends Component {
	// static contextType = LoginContext;
  // constructor(props){
	// 	super(props);
	// 	let avaliableLangs = ['ca','es','en'];
	// 	let defaulLang = avaliableLangs.includes(window.navigator.language.slice(0, 2)) ? window.navigator.language.slice(0, 2) : 'es';
	// 	this.state = {
	// 		lang: avaliableLangs.includes(localStorage.getItem('lang')) ? localStorage.getItem('lang') : defaulLang,
	// 	};
  // }

	// changeLanguage = ({ currentTarget: { id } }) => {
	// 	localStorage.setItem('lang', id);
	// 	this.setState({
	// 		lang: id,
	// 	});
	// };
	
	render() {
		return (
			<LocaleContextProvider>
				<LocaleContext.Consumer>
					{(context) => {
						if (context.isLogged) {
							return (
								<App
									navigator={navigators.filter((nav) => nav.name === 'app')[0]}
									changeLanguage={context.changeLanguage}
								/>
							);
						}
						return (<>
							<HomePage 
								navigator={navigators.filter((nav) => nav.name === 'root')[0]} 
								changeLanguage={context.changeLanguage}
							/></>
						);
					}}
				</LocaleContext.Consumer>
			</LocaleContextProvider>
		);
	}
}
