import React, { Component } from 'react';
import HomePage from './components/homepage/Homepage';
import App from './components/app/App';

import navigators from './configs/navigators.jsx';
import LocaleContextProvider, { LocaleContext } from './contexts/LocaleContext';

export default class Platform extends Component {
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
