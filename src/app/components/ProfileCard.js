import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

export default function ProfileCard(props) {
	const work = props.work;
	console.log(work);
	let translation;
	let title, description, rater;
	for (translation in work.translations) {
		title = work.translations[0].title;
		description = work.translations[0].description;
		rater = work.valoration_avg / 10 / 2;
		break;
	}

	return (
		<div class='card card-profile mt-3'>
			<img
				class='card-img-top'
				src='/assets/img/img-work.jpg'
				alt='Card image cap'></img>
			<div class='card-body'>
				<div class='card-title'>
					<div className='d-flex justify-content-end'>
						<Rater
							total={5}
							rating={work.valoration_avg / 10 / 2}
							interactive={false}
						/>
					</div>
					<h4>
						<b>{work.title || work.translations[0].title}</b>
					</h4>
				</div>
				<p class='card-text'>
					{work.description || work.translations[0].description}
				</p>
				<a href='#' class='btn btn-block text-white'>
					See Offer
				</a>
			</div>
		</div>
	);
}
