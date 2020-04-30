import React from 'react';
import Translate from '../../../translations/Translate';

export default function HowItWorks() {
	return (
		<div className='container mt-5' id='HowItWorks'>
			<div className='row mt-4'>
				<div className='col-lg-7'>
					<h1>
						<Translate string={'create-an-offer'} />
					</h1>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting.
					</p>
				</div>
				<div className='col-5 m-lg-auto'>
					<img src='/assets/img/svg/offer-lg.svg' alt='...' className=''></img>
				</div>
			</div>
			<div className='row justify-content-md-end mt-4'>
				<div className='col-lg-7 d-right order-lg-2'>
					<h1>
						<Translate string={'contact-people'} />
					</h1>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting.
					</p>
				</div>
				<div className='col-5 m-lg-auto order-lg-1'>
					<img
						src='/assets/img/svg/contact-lg.svg'
						alt='...'
						className=''></img>
				</div>
			</div>
			<div className='row mt-4'>
				<div className='col-lg-7'>
					<h1>
						<Translate string={'stablish-a-work'} />
					</h1>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting.
					</p>
				</div>
				<div className='col-5 m-lg-auto'>
					<img src='/assets/img/svg/work-lg.svg' alt='...' className=''></img>
				</div>
			</div>
			<div className='row justify-content-md-end mt-4 mb-5'>
				<div className='col-lg-7 d-right order-lg-2'>
					<h1>
						<Translate string={'get-coins'} />
					</h1>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting.
					</p>
				</div>
				<div className='col-5 m-lg-auto order-lg-1'>
					<img src='/assets/img/svg/coins-lg.svg' alt='...' className=''></img>
				</div>
			</div>
		</div>
	);
}
