import React, { Component } from 'react';
import { MdAddBox } from 'react-icons/md';
import { LocaleContext } from '../../../contexts/LocaleContext';
import Axios from 'axios';
import Rater from 'react-rater';
import Translate from '../../../translations/Translate';
import ProfileCard from './ProfileCard';
import Loader from '../../layouts/Loader';

export default class Profile extends Component {
	static contextType = LocaleContext;
	constructor(props) {
		super(props);
		this.state = {lang: [], user: [], works: [] , loaded: false };
		this.getWorks = this.getWorks.bind(this);
		this.getUserProfile = this.getUserProfile.bind(this);
	}

	componentDidMount() {
		//Set language
		this.setState((state) => {
			return {lang: this.context.lang};
		})

		//Get data
		this.getUserProfile();
	}

	componentDidUpdate() {
    if(this.state.lang !== this.context.lang){
			this.setState((state) => {
				return {lang: this.context.lang};
			})
			this.getUserProfile();
    }
	}

	getUserProfile() {
		const { initials, tag } = (this.props.match.path === '/me') ? this.context.user : this.props.match.params;
		Axios.get(
			`${process.env.REACT_APP_API_URL}/${this.context.lang}/user/${initials}/${tag}`
		).then(response => {
			this.setState({ user: response.data });
			this.getWorks(response.data.id);
		}); 
	};

	getWorks(user_id) {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/${this.context.lang}/works/user/${user_id}`
		).then(response => {
			this.setState({ works: response.data, loaded: true });
		});
	}
	render() {
		const { user } = this.state;
		if (!this.state.loaded) return <Loader/>;
		return (
			<LocaleContext.Consumer>
				{(context) => {
					return (
						<div className='profile'>
							{console.log(user)}
							<div className='img-back-profile'>
								<img
									src='/assets/img/img-profile.jpg'
									alt=''
									className=''></img>
							</div>
							<div id='head-profile'>
								<div className='row row-profile-name'>
									<div className='col-md-6 d-flex justify-content-md-start justify-content-center'>
										<div className='img-profile'>
											<img
												src='/assets/img/avatar-placeholder.png'
												alt='...'
												className=' rounded-circle shadow-sm'></img>
											<h5>
												{user.name}
												<p className='d-inline text-muted'>
													#{user.tag}
												</p>
											</h5>
										</div>
									</div>
									<div
										id='profile-average'
										className='col-md-6 mt-3 d-flex justify-content-end'>
										<p>RATE AVERAGE</p>
										<Rater total={5} rating={3} interactive={false} />
									</div>
								</div>
								<div className='d-flex justify-content-md-end justify-content-center'>
									<button className='btn pl-4 pr-4 mr-3'>Edit</button>
									<button className='btn pl-4 pr-4 '>Contact</button>
								</div>
							</div>
							<div id='body-profile'>
								<div className='progress md-progress mt-4 mb-4'>
									<h5 className='pr-4'>
										Lvl : <b>3</b>
									</h5>
									<div
										className='progress-bar'
										role='progressbar'
										aria-valuenow='25'
										aria-valuemin='0'
										aria-valuemax='100'>
										25%
									</div>
								</div>
								<div className='card card-about'>
									<div className='card-header'>
										<h3>
											<b>ABOUT ME</b>
										</h3>
									</div>

									<div className='card-body'>
										<p className='card-text'>
											{user.description ? user.description[0].description : <Translate string={'no-description'}/>}
										</p>
									</div>
								</div>
								<div className='profile-offers'>
									<h3>
										<b>My Offers</b>
									</h3>
									<div className='card-deck text-center'>
										{this.state.works.map((work, index) => (
											<ProfileCard
												key={index}
												work={work}
												translations={work.translations}
											/>
										))}
									</div>
									<div className='icon-more text-center '>
										<a href='/newoffer'>
											<MdAddBox />
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</LocaleContext.Consumer>
		);
	}
}
