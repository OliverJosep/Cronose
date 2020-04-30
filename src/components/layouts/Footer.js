import React from 'react';
import { IoLogoTwitter, IoLogoFacebook, IoLogoInstagram } from 'react-icons/io';
import LanguagePicker from './LanguagePicker';

export default function Footer(props) {
	return (
		<footer className='page-footer p-4'>
			<LanguagePicker changeLanguage={props.changeLanguage} />
			<div className='links row text-center'>
				<div className='col-md-6 text-md-left'>
					<p>
						<a href='/home'>Home</a>
					</p>
					<p>
						<a href='/home#about'>About Us</a>
					</p>
					<p>
						<a href='/home#HowItWorks'>How it work</a>
					</p>
					<p>
						<a href='/home#contact'>Contact</a>
					</p>
				</div>
				<div className='col-md-6 text-md-left'>
					<p>
						<a href='#'>FAQ</a>
					</p>
					<p>
						<a href='#'>Terms & Conditions</a>
					</p>
					<p>
						<a href='#'>Help & Support</a>
					</p>
					<p>
						<a href='#'>Team</a>
					</p>
				</div>
				<div className='newsletter col-md-6'>
					<form>
						<div className='form-inline justify-content-center justify-content-md-start'>
							<input
								type='email'
								className='form-control mr-sm-2'
								id='InputEmail'
								aria-describedby='emailHelp'
								placeholder='Enter email'
							/>
							<button type='submit' className='btn-submit btn my-2 my-sm-0'>
								Submit
							</button>
						</div>
					</form>
				</div>
				<div className='social col-md-6 text-md-left'>
					<a href='https://twitter.com/'>
						<IoLogoTwitter />
					</a>
					<a href='https://es-es.facebook.com/'>
						<IoLogoFacebook />
					</a>
					<a href='https://www.instagram.com/?hl=es'>
						<IoLogoInstagram />
					</a>
				</div>
				<div className='col-12'>
					<div className='footer-copyright text-center py-3'>
						© 2020 Copyright:
						<a href=''> cronose.com</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
