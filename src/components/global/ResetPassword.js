import React from 'react';
import md5 from 'md5';
import Axios from 'axios';
import qs from 'qs';

export default class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: new URL(window.location.href).searchParams.get('token'),
		};
		if (!this.state.token) window.location.href = '/login';
		this.changePassword = this.changePassword.bind(this);
	}

	changePassword(e) {
		e.preventDefault();
		const password = md5(document.getElementById('newpassword1').value);
		if (password != md5(document.getElementById('newpassword2').value))
			return false;
		Axios.post(
			`${process.env.REACT_APP_API_URL}/reset_password`,
			qs.stringify({
				token: this.state.token,
				password: password,
			})
		).then(function() {
			window.location.href = '/login';
		});
	}

	render() {
		return (
			<div className='reset-pass card text-center'>
				<h3 className='card-title text-center'>Reset Password</h3>
				<form
					id='register_form'
					method='post'
					target='_self'
					className='form-signin'
					onSubmit={this.changePassword}>
					<div className='form-label-group mt-4 text-left'>
						<label htmlFor='password'>New Password</label>
						<input
							id='newpassword1'
							type='password'
							name='newpassword1'
							className='form-control'
							placeholder=''
							required
						/>
					</div>
					<div className='form-label-group mt-4 text-left'>
						<label htmlFor='password'>Repeat the Password</label>
						<input
							id='newpassword2'
							type='password'
							name='newpassword2'
							className='form-control'
							placeholder=' '
							required
						/>
					</div>
					<input
						className=' btn btn-lg btn-primary btn-block mt-4'
						type='submit'
						value='Change Password'
						required
					/>
				</form>
			</div>
		);
	}
}
