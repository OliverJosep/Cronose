import React from 'react';
import { SideBar } from '../components/layouts/Nav';
import Footer from '../components/layouts/Footer';

export default function App(props) {
	return (
		<div id='app' className='w-100'>
			<SideBar
				basename={props.navigator.basename}
				routes={props.navigator.routes}
				refresh={false}
			/>
			<Footer />
		</div>
	);
}
