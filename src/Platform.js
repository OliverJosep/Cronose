import React, { Component } from 'react';
import HomePage from './components/homepage/Homepage';
import App from './components/app/App';

import navigators from './configs/navigators.js';
import LoginContextProvider, { LoginContext } from './contexts/LoginContext';

export default class Platform extends Component {
  constructor(props){
    super(props);
		this.state = {
			lang: 'ca',
		};
  }

	changeLanguage = ({ currentTarget: { id } }) => {
		this.setState({
			lang: id,
		});
	};
	
	render() {
		return (
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
		);
	}
}
