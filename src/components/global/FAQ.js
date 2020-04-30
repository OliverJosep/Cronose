import React from 'react';

export default function FAQ(props) {
	const data = props.data;

	return (
		<div className='container' id='about'>
			<h1>F.A.Q.</h1>
			<b>Aquí pregunta:</b>
			<p>La respuesta típica e inecesariamente larga.</p>
		</div>
	);
}
