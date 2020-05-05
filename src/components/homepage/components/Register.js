import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import { NavLink } from 'react-router-dom';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = { province: [], cities: [] };
		this.register = this.register.bind(this);
		this.getProvinces = this.getProvinces.bind(this);
		this.getCities = this.getCities.bind(this);
	}

	componentDidMount() {
		this.getProvinces();
	}

	register(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.set('password', md5(formData.get('password')));
		Axios.post(`${process.env.REACT_APP_API_URL}/register`, formData, {
			headers: {
				'Content-Type':
					'multipart/form-data; boundary=899579491390198298378346',
			},
		})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	getProvinces() {
		Axios.get(`${process.env.REACT_APP_API_URL}/provinces`)
			.then((response) => this.setState({ province: response.data }))
			.catch((err) => console.error(err));
	}

	getCities() {
		const province_id = document.getElementById('province_id').value;
		Axios.get(`${process.env.REACT_APP_API_URL}/cities/${province_id}`)
			.then((response) => {
				this.setState({ cities: response.data || this.state.cities });
				// const cities = document.getElementById('cities');
			})
			.catch((err) => console.error(err));
	}

	render() {
		return (
			<div className='jumbotron'>
				<section className='register signin container p-5 bg-white'>
					<h1 className="mb-4">Register</h1>
					<form
						id='register_form'
						method='post'
						target='_self'
						className='form-signin'
						onSubmit={this.register}>
						<div className='row'>
							<div className='form-group col-12 col-md-6 p-1'>
								<label htmlFor='name'>Name:</label>
								<input
									id='name'
									type='text'
									name='name'
									className='form-control'
									placeholder='Enter your name'
									required
								/>
							</div>
						</div>
						<div className='row'>
							<div className='form-group col-md-6 p-1'>
								<label htmlFor='surname'>Surname:</label>
								<input
									id='surname'
									type='text'
									name='surname'
									className='form-control'
									placeholder='Your first surname'
									required
								/>
							</div>
							<div className='form-group col-md-6 p-1'>
								<label htmlFor='surname_2'>
									Surname 2: <small className='text-muted'>Optional</small>
								</label>
								<input
									id='surname_2'
									type='text'
									name='surname_2'
									className='form-control'
									placeholder='Your second surname'
									required
								/>
							</div>
						</div>
						<div className='row'>
							<div className='form-group col-md-3 p-1'>
								<label htmlFor='dni'>DNI:</label>
								<input
									id='dni'
									type='text'
									name='dni'
									className='form-control'
									placeholder='National document'
									required
								/>
							</div>
							<div className='form-group col-md-9 p-1'>
								<label htmlFor='email'>Email:</label>
								<input
									id='email'
									type='email'
									name='email'
									className='form-control'
									placeholder='example@email.com'
									required
								/>
							</div>
						</div>
						<div className='row'>
							<div className='form-label-group col-md-6 p-1'>
								<label htmlFor='province_id'>Province</label>
								<select
									id='province_id'
									name='province_id'
									className='form-control'
									onChange={this.getCities}
									defaultValue='0'
									required>
									<option value='0'>
										Select province
									</option>
									{this.state.province.map((province, index) => (
										<option value={province.id}>{province.name}</option>
									))}
								</select>
							</div>
							<div className='form-label-group col-md-6 p-1'>
								<label htmlFor='city_cp'>City</label>
								<select
									id='city_cp'
									name='city_cp'
									className='form-control'
									defaultValue='0'
									required>
									<option value='0' disabled>
										Select City
									</option>
									{this.state.cities.map((cities, index) => (
										<option value={cities.cp}>{cities.name}</option>
									))}
								</select>
							</div>
						</div>
						<hr />
						<div className='row'>
							<div className='col-12 col-md-6'>
								<div className='form-label col p-1'>
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
								<div className='form-label-group col p-1'>
									<label htmlFor='r_password'>Repeat password</label>
									<input
										id='r_password'
										type='password'
										name='r_password'
										className='form-control'
										placeholder='password'
										required
									/>
								</div>
							</div>
							<div className='col-12 col-md-6 pl-3'>
								<div className='form-group col p-1'>
									<label htmlFor='avatar'>Avatar</label>
									<input
										id='avatar'
										type='file'
										name='avatar'
										className='form-control-file'
										required></input>
								</div>
								<div className='form-group col p-1'>
									<label htmlFor='dni_img'>DNI</label>
									<input
										id='dni_img'
										type='file'
										name='dni_img'
										className='form-control-file'
										required></input>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col mt-3'>
								<div className='form-label-group col-12'>
									<input id='private' name='private' type='checkbox' />
									<label className='ml-2' htmlFor='private'>
										Private account
									</label>
								</div>
								<div className='form-label col-12'>
									<input
										id='terms_and_conditions'
										name='terms_and_conditions'
										type='checkbox'
									/>
									<label className='ml-2' htmlFor='terms_and_conditions'>
										Accept the 
									<NavLink
										to={`/#`}
										data-toggle="modal" data-target="#termsAndConds">
										&nbsp;terms and conditions
									</NavLink> 
									</label>
								</div>
							</div>
							<div className='col'>
								<input
									className='btn btn-lg btn-register w-100 mt-3 text-white'
									type='submit'
									value='Submit'
								/>
								<div className='form-label-group col-12 mt-2'>
									<label className='ml-2' htmlFor='terms_and_conditions'>
										You already have an account? Please
										<NavLink
											to='/login'
											activeClassName='active'>
											&nbsp;log in!
										</NavLink> 
									</label>
								</div>
							</div>
						</div>
            <div className="modal fade bannerformmodal bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="bannerformmodal" aria-hidden="true" id="termsAndConds">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4">
                  <h4 className="modal-title mb-4">Condiciones generales de Cronose</h4>
                  <p>1. ACTIVIDAD. Cronose C.B (en adelante la página) no se hace responsable del uso que los usuarios hagan de la misma. Sin embargo, se reserva el derecho de tomar las medidas que considere oportunas en la gestión de éstos, pudiendo sus perfiles ser borrados sin previo aviso ni derecho a compensación alguna.</p>
                  <p>2. PRECIO. El ratio de precios por hora de las actividades es susceptible de ser modificado.</p>
                  <p>4. BAJA O CANCELACIÓN. Los perfiles de usuarios nunca se borrarán complemtamente. En caso de desear eliminar el perfil simplemente se ocultará al resto de usuarios, pero en cualquier momento se podrá dar de alta de nuevo.</p>
                  <p>4.1 La página podrá impedir el acceso de los usuarios que considere que no permiten el desarrollo de las actividades. La expulsión no da lugar a devolución ni total ni parcial de la cuota mensual en caso de ser usuario <em>premium</em>.</p>
                  <p>4.2 El contratante declara expresamente que las informaciones facilitadas en la inscripción son verdaderas y exactas. Toda omisión o información errónea puede dar lugar a la expulsión inmediata de la página.</p>
                  <p>5. JURISDICCIÓN Y RÉGIMEN LEGAL APLICABLE. En relación a toda cuestión litigiosa que surja en relación con el presente contrato o relación jurídica, las partes y de mutuo acuerdo renuncian a su fuero propio si lo tuvieran, sometiéndose al de los Juzgados y Tribunales de la ciudad de Palma de Mallorca.</p>
                </div>
              </div>
            </div>
					</form>
				</section>
			</div>
		);
	}
}
