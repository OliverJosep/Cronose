import React from 'react';
import { NavBar } from '../components/layouts/Nav';
import Footer from '../components/layouts/Footer';

export default function HomePage(props) {
	return (
		<div id='homepage' className='w-100'>
			<NavBar
				basename={props.navigator.basename}
				routes={props.navigator.routes}
				refresh={true}
			/>
			<Footer />
		</div>
	);
}
