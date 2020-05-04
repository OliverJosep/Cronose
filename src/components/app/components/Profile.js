import React, { Component } from 'react';
import { MdAddBox } from 'react-icons/md';
import Rater from 'react-rater';
import { LoginContext } from '../../../contexts/LoginContext';
import { LocaleContext } from '../../../contexts/LocaleContext';
import ProfileCard from './ProfileCard';
import Axios from 'axios';

export default class Profile extends Component {
	static contextType = LoginContext;
	// static contextType = LocaleContext;
	constructor(props) {
		super(props);
		this.state = {lang: [], user: [], works: [] };
		this.getWorks = this.getWorks.bind(this);
		this.getUserProfile = this.getUserProfile.bind(this);
	}

	componentDidMount() {
		this.setState((state) => {
			return {lang: this.context.lang};
		})
		console.log(this.context)
		// this.getUserProfile();
		// this.getWorks();
	}

	componentDidUpdate() {
    if(this.state.lang !== this.context.lang){
			this.setState((state) => {
				return {lang: this.context.lang};
			})
    }
	}

	getUserProfile() {
		const { initials, tag } = (this.props.match.path === '/me') ? this.context.user : this.props.match.params;
		console.log(this.props);
	}

	getWorks() {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/works/user/${this.context.user.id}`
		).then((response) => this.setState({ works: response.data }));
	}
	render() {
		return (
			<LoginContext.Consumer>
				{(context) => {
					var srcImg =
						`${process.env.REACT_APP_API_URL}/images/` +
						context.user.avatar.url;
					return (
						<div className='profile'>
							<div className='img-back-profile'>
								<img
									src='/assets/img/img-profile.jpg'
									alt=''
									className=''></img>
							</div>
				{console.log(this.state)}
							<div id='head-profile'>
								<div className='row row-profile-name'>
									<div className='col-md-6 d-flex justify-content-md-start justify-content-center'>
										<div className='img-profile'>
											<img
												src={srcImg}
												alt='...'
												className=' rounded-circle shadow-sm'></img>
											<h5>
												{/* {context.user.name} */}
												<p className='d-inline text-muted'>
													{/* #{context.user.tag} */}
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
											Lorem ipsum dolor sit amet, ea vel prima adhuc, scripta
											liberavisse ea quo, te vel vidit mollis complectitur. Quis
											verear mel ne. Munere vituperata vis cu, te pri duis
											timeam scaevola, nam postea diceret ne. Cum ex quod
											aliquip mediocritatem, mei habemus persecuti mediocritatem
											ei.
										</p>
										<p className='card-text'>
											Lorem ipsum dolor sit amet, ea vel prima adhuc, scripta
											liberavisse ea quo, te vel vidit mollis complectitur. Quis
											verear mel ne. Munere vituperata vis cu, te pri duis
											timeam scaevola, nam postea diceret ne. Cum ex quod
											aliquip mediocritatem, mei habemus persecuti mediocritatem
											ei.
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
			</LoginContext.Consumer>
		);
	}
}
