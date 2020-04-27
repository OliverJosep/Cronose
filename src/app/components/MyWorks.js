import React, { Component } from 'react';
import WorkCard from '../../components/WorkCard';
import Axios from 'axios';
import { LoginContext } from '../../contexts/LoginContext';

export default class MyWorks extends Component {
	static contextType = LoginContext;
	constructor(props) {
		super(props);
		this.state = { works: [] };
		this.getWorks = this.getWorks.bind(this);
	}

	componentDidMount() {
		this.getWorks();
	}

	getWorks() {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/works/user/${this.context.user.id}`
		).then((response) => this.setState({ works: response.data }));
	}

	render() {
		return (
			<>
				<div className='text-right pt-4 mr-4'>
					<a href='/wallet' className='btn'>
						WORK HISTORY
					</a>
				</div>
				<div className='text-center pt-2'>
					<h1>My Works</h1>
				</div>
				<section className='works'>
					{this.state.works.map((work, index) => (
						<WorkCard
							key={index}
							work={work}
							translations={work.translations}
						/>
					))}
				</section>
				<div className='text-center'>
					<a href='/newoffer' className='btn btn-lg mb-4'>
						NEW OFFER
					</a>
				</div>
			</>
		);
	}
}