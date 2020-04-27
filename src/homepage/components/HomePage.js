import React, { Component } from 'react';
import { LocaleContext } from '../LocaleContext.js';
import Home from './Home';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			preferredLocale: 'ca',
		};
	}

	changeLanguage = ({ currentTarget: { id } }) => {
		this.setState({
			preferredLocale: id,
		});
	};

	render() {
		return (
			<LocaleContext.Provider value={this.state.preferredLocale}>
				<Home changeLanguage={this.changeLanguage} />
			</LocaleContext.Provider>
		);
	}
}

export default HomePage;
