import React, { Component } from 'react';
import HomePage from './homepage/HomePage';
import App from './app/App';

import navigators from './configs/navigators.js';
import LoginContextProvider, { LoginContext } from './contexts/LoginContext';

export default function Platform() {
	return (
		<LoginContextProvider>
			<LoginContext.Consumer>
				{(context) => {
					if (context.isLogged) {
						return (
							<App
								navigator={navigators.filter((nav) => nav.name == 'app')[0]}
							/>
						);
					}
					return (
						<HomePage
							navigator={navigators.filter((nav) => nav.name == 'root')[0]}
						/>
					);
				}}
			</LoginContext.Consumer>
		</LoginContextProvider>
	);
}
