import React, { Component } from 'react';
import { LocaleContext } from '../contexts/LocaleContext';

import en from './en.json';
import es from './es.json';
import ca from './ca.json';

class Translate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			langs: {
				en,
				es,
				ca,
			},
		};
	}

	render() {
		const { langs } = this.state;
		const { string } = this.props;
		return (
			<LocaleContext.Consumer>
				{(value) => langs[value.lang][string]}
			</LocaleContext.Consumer>
		);
	}
}

export default Translate;
