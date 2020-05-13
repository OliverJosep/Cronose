import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import  { LocaleContext } from '../../contexts/LocaleContext';
import Translate from '../../translations/Translate';
import Loader from '../layouts/Loader';

const position = [39.5643576, 3.20227];

const styles = {
	wrapper: {
		height: 200,
		width: '100%',
		margin: '0 auto',
		display: 'flex',
	},
	map: {
		flex: 1,
	},
};

const Moves = (props) => {
	return (
		<div style={styles.wrapper}>
			<Map style={styles.map} center={props.center} zoom={props.zoom}>
				<TileLayer url={props.url} />
				<Marker position={position}>
					<Popup>
						<b>Mi casa</b>
					</Popup>
				</Marker>
			</Map>
		</div>
	);
};

Moves.defaultProps = {
	center: [39.5643576, 3.20227],
	zoom: 16,
	url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
};

export default class OfferDetails extends React.Component {
	static contextType = LocaleContext;
	constructor(props) {
		super(props);

		this.state = {
			offer: null,
			loaded: false
		};

		this.getOffer = this.getOffer.bind(this);
	}

	componentDidMount() {
		this.getOffer();
	}
	componentDidUpdate() {
    if(this.state.lang !== this.context.lang){
			this.getOffer();
			this.setState((state) => {
				return {lang: this.context.lang};
			})
    }
	}

	getOffer() {
		const self = this;
		const { initials, tag, specialization } = this.props.match.params;
		Axios.get(
			`${process.env.REACT_APP_API_URL}/${this.context.lang}/offer/${initials}/${tag}/${specialization}`
		)
			.then((response) => {
				self.setState({ offer: response.data, loaded: true });
			})
			.catch((error) => {
				console.log('ERROR');
			});
	}

	render() {
		const { offer } = this.state;
		if (!this.state.loaded) return <Loader></Loader>;
		return (
			<section className='work'>
				<div className='container mt-2'>
					<div className='row'>
						<h1>{offer.title}</h1>
						<h3 className='my-auto ml-4'> Precio: {offer.coin_price}</h3>
					</div>
					<div className='row'>
						<div className='col-12 col-md-8'>
							<div
								id='carousel'
								className='carousel slide m-auto'
								data-ride='carousel'>
								<ol className='carousel-indicators'>
									<li
										data-target='#carousel'
										data-slide-to='0'
										className='active'></li>
									<li data-target='#carousel' data-slide-to='1'></li>
									<li data-target='#carousel' data-slide-to='2'></li>
								</ol>
								<div className='carousel-inner'>
									<div className='carousel-item active'>
										<img
											className='d-block w-100'
											src='/assets/img/img-work.jpg'
											alt='First slide'
										/>
									</div>
									<div className='carousel-item'>
										<img
											className='d-block w-100'
											src='/assets/img/img-work.jpg'
											alt='Second slide'
										/>
									</div>
									<div className='carousel-item'>
										<img
											className='d-block w-100'
											src='/assets/img/img-work.jpg'
											alt='Third slide'
										/>
									</div>
								</div>
								<a
									className='carousel-control-prev'
									href='#carousel'
									role='button'
									data-slide='prev'>
									<span
										className='carousel-control-prev-icon'
										aria-hidden='true'></span>
									<span className='sr-only'>Previous</span>
								</a>
								<a
									className='carousel-control-next'
									href='#carousel'
									role='button'
									data-slide='next'>
									<span
										className='carousel-control-next-icon'
										aria-hidden='true'></span>
									<span className='sr-only'>Next</span>
								</a>
							</div>
							<div className='row'>
								<div className='col-6'>
									<Rater
										total={5}
										rating={offer.personal_valoration / 20}
										interactive={false}
									/>
									<small className='muted ml-2 my-auto'>
										Personal Valoration
									</small>
								</div>
								<div className='col-6 text-right'>
									<small className='muted mr-2 my-auto'>Users Valoration</small>
									<Rater
										total={5}
										rating={offer.valoration_avg / 20}
										interactive={false}
									/>
								</div>
							</div>
							<div className='row mt-2'>
								<img
									src={`${process.env.REACT_APP_API_URL}/images/${offer.user.avatar.url}`}
									height='50px'
									alt='user-avatar'
								/>
								<div className='ml-2 my-auto'>
									{offer.user.full_name || offer.user.initials}
									<h6 className='d-inline text-muted'>#{offer.user.tag}</h6>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='container-fluid'>
									<h4>{offer.translations[0].title}</h4>
									<hr />
									<p>
										{offer.translations[0].description ? offer.translations[0].description : <Translate string={'no-description'}/>}
									</p>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='container-fluid'>
									<h4>User info</h4>
									<hr />
									<div className='row mt-2'>
										<img
											src='/assets/img/avatar-placeholder.png'
											height='40px'
											alt='avatar-placeholder'
										/>
										<h4 className='ml-2 my-auto'>{offer.user.full_name}</h4>
									</div>
									<div className='row'>
										<div className='container-fluid mt-4'>
											<div className='col-4'>
												<h4>Description</h4>
												<hr />
											</div>
											<p>
												{offer.user.description ? offer.user.description[0].description : <Translate string={'no-description'}/>}
											</p>
										</div>
									</div>
									<div className='row'>
										<div className='container-fluid mt-4'>
											<div className='col-4'>
												<h4>Rating</h4>
												<hr />
											</div>
											<div className='col-6 text-left'>
												<div className='row'>
													<div className='col'>
														<small className='muted mr-2 my-auto'>
															Puntuality
														</small>
													</div>
													<div className='col'>
														<Rater total={5} rating={4.5} interactive={false} />
													</div>
												</div>
											</div>
											<div className='col-6 text-left'>
												<div className='row'>
													<div className='col'>
														<small className='muted mr-2 my-auto'>
															Profesionality
														</small>
													</div>
													<div className='col'>
														<Rater total={5} rating={4.5} interactive={false} />
													</div>
												</div>
											</div>
											<div className='col-6 text-left'>
												<div className='row'>
													<div className='col'>
														<small className='muted mr-2 my-auto'>
															Simpathy
														</small>
													</div>
													<div className='col'>
														<Rater total={5} rating={4.5} interactive={false} />
													</div>
												</div>
											</div>
										</div>
										<div className='container-fluid mt-4'>
											<div className='mb-4'>
												<h4>Comments</h4>
												<div className='border-bottom col-4'></div>
												<div className='container-fluid mt-3'>
													<div className='row mt-2'>
														<img
															src='/assets/img/avatar-placeholder.png'
															height='30px'
															alt='avatar-placeholder'
														/>
														<h4 className='ml-2 my-auto'>Pepito grillo</h4>
													</div>
													<div className='row mt-2'>
														<div className='col-8'>
															<p>"Me gusta este hombre"</p>
														</div>
														<div className='pl-3 col-4'>
															<div className='text-left'>
																<small className='muted mr-2 my-auto'>
																	Valoration Average
																</small>
																<Rater
																	total={5}
																	rating={4}
																	interactive={false}
																/>
															</div>
														</div>
													</div>
													<div className='row mt-2'>
														<img
															src='/assets/img/avatar-placeholder.png'
															height='30px'
															alt='avatar-placeholder'
														/>
														<h4 className='ml-2 my-auto'>Amancio Ortega</h4>
													</div>
													<div className='row mt-2'>
														<div className='col-8'>
															<p>
																"Salvó mi negocio, un crack, máquina,
																mastodonte, tifón..."
															</p>
														</div>
														<div className='pl-3 col-4'>
															<div className='text-left'>
																<small className='muted mr-2 my-auto'>
																	Valoration Average
																</small>
																<Rater
																	total={5}
																	rating={5}
																	interactive={false}
																/>
															</div>
														</div>
													</div>
													<div className='row mt-2'>
														<img
															src='/assets/img/avatar-placeholder.png'
															height='30px'
															alt='avatar-placeholder'
														/>
														<h4 className='ml-2 my-auto'>Willy Toledo</h4>
													</div>
													<div className='row mt-2'>
														<div className='col-8'>
															<p>
																"No me denunció a pesar de blasfemar un par de
																veces. Se agradece bastante"
															</p>
														</div>
														<div className='pl-3 col-4'>
															<div className='text-left'>
																<small className='muted mr-2 my-auto'>
																	Valoration Average
																</small>
																<Rater
																	total={5}
																	rating={3.5}
																	interactive={false}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='m-3'>
								<h4>Schedule</h4>
								<hr />
								<p>
									<b>Días de la semana:</b> Entre semana.
								</p>
								<p>
									<b>Horario:</b> De 10:00h a 13:00h.
								</p>
							</div>
							<div className='m-3 mt-4'>
								<h4>Zone info</h4>
								<hr />
								<p>Realizo el trabajo en mi casa, no hago desplazamientos.</p>
							</div>
							<div className='m-3'>
								<Moves />
							</div>
							<div className='text-center mt-4'>
								{console.log(offer)}
								{this.context.user.id === offer.user.id 
									? <NavLink
											to={`/offer/edit/${offer.specialization_id}`}
											className='btn pl-4 pr-4'>
											Edit
										</NavLink>
									: <NavLink
											to={`/chat?id=${offer.user.id}`}
											className='btn pl-4 pr-4'>
											Contact
										</NavLink>
								}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
