import React from 'react';
import { SideBar } from '../layouts/Nav';

export default function App(props) {
	return (
		<div id='app' className='w-100'>
			<SideBar
				basename={props.navigator.basename}
				routes={props.navigator.routes}
				changeLanguage={props.changeLanguage}
			/>
		</div>
	);
}
