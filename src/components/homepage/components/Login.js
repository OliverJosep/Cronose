import React from 'react';
import md5 from 'md5';
import { LoginContext } from '../../../contexts/LoginContext';
import { NavLink } from 'react-router-dom';
import Reset from './Reset';

export default class Login extends React.Component {
	static contextType = LoginContext;

	constructor(props) {
		super(props);

		this.login = this.login.bind(this);
	}

	login(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.set('password', md5(formData.get('password')));
		const data = Object.fromEntries(formData);
		this.context.login(data);
	}

	render() {
		return (
			<div className='card-login card text-center'>
				<h3 className='card-title text-center'>LOGIN</h3>
				<form
					id='login_form'
					method='post'
					target='_self'
					className='form-signin'
					onSubmit={this.login}>
					<div className='form-label-group mt-4 text-left'>
						<label htmlFor='email'>Email</label>
						<input
							id='email'
							type='email'
							name='email'
							className='form-control'
							placeholder='email'
							required
							autoFocus
						/>
					</div>
					<div className='form-label-group mt-4 text-left'>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							type='password'
							name='password'
							className='form-control'
							placeholder='password'
							required
						/>
					</div>
					<input
						className='btn-login btn btn-lg btn-primary btn-block mt-4'
						type='submit'
						value='Submit'
					/>
				</form>
				<div className='card-footer'>
					<div className='justify-content-center links'>
						Don't have an account?
						<NavLink
							to='/register'
							activeClassName='active'>
							&nbsp;Sign Up!
						</NavLink> 
					</div>
					<div className=' justify-content-center'>
						<NavLink
							to={`/#`}
							data-toggle="modal" data-target='#reset_password'>
							Forgot your password?
						</NavLink> 
					</div>
				</div>
				<Reset />
			</div>
		);
	}
}
