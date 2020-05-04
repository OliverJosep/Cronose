import React from 'react';
import { NavBar } from '../../components/layouts/Nav';
import Translate from '../../translations/Translate';

export default function HomePage(props) {
	return (
		<div id='homepage' className='w-100'>
			<NavBar
				basename={props.navigator.basename}
				routes={props.navigator.routes}
				changeLanguage={props.changeLanguage}
			/>
		</div>
	);
}
