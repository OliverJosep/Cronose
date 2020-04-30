import React, { Component } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import {
	IoIosArrowDroprightCircle,
	IoIosArrowDropleftCircle,
} from 'react-icons/io';
import WorkCard from './WorkCard';
import qs from 'qs';

export default class Market extends Component {
	constructor(props) {
		super(props);
		this.state = {
			works: [],
			categories: [],
			specialization: [],
		};
		this.getWorks = this.getWorks.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.getSpecialization = this.getSpecialization.bind(this);
		this.getFilteredWorks = this.getFilteredWorks.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
	}

	componentDidMount() {
		this.getWorks();
		this.getCategories();
		$('#btn-show').click(function() {
			$('#jobFilter').show();
			$('#btn-show').hide();
		});

		$('#btn-hide').click(function() {
			$('#jobFilter').hide();
			$('#btn-show').show();
		});
	}

	resetFilter() {
		this.setState({ categories: [], specialization: [] });
		this.getWorks();
		this.getCategories();
	}

	getWorks() {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/works/0/10/default/ca`
		).then((response) =>
			this.setState({ works: response.data || this.state.works })
		);
	}

	getFilteredWorks() {
		const category_id = document.getElementById('category_id').value;
		const specialization_id =
			category_id != '0'
				? document.getElementById('specialization_id').value
				: '';

		const string = document.getElementById('search').value;

		Axios.post(
			`${process.env.REACT_APP_API_URL}/works/filter`,
			qs.stringify({
				filter: {
					category: category_id,
					specialization: specialization_id,
					string: string,
					defaultLang: 'ca',
				},
			})
		).then((response) => this.setState({ works: response.data }));
	}

	getCategories() {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/categories/ca`
		).then((response) => this.setState({ categories: response.data }));
	}

	getSpecialization() {
		const category_id = document.getElementById('category_id').value;
		Axios.get(
			`${process.env.REACT_APP_API_URL}/specialization/ca/${category_id}`
		).then((response) => this.setState({ specialization: response.data }));
		this.getFilteredWorks();
	}

	render() {
		return (
			<>
				<div className='btn-search md-form mt-0'>
					<input
						className='form-control'
						type='text'
						id='search'
						onChange={this.getFilteredWorks}
						placeholder='Search'
						aria-label='Search'></input>
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
				<a id='btn-show'>
					<IoIosArrowDropleftCircle />
				</a>

				<div className='' id='jobFilter'>
					<a id='btn-hide'>
						<IoIosArrowDroprightCircle />
					</a>
					<h2 className='p-3 pt-4 text-center'>Job Filter</h2>
					<div className='input-group p-2'>
						<div className='p-2 pt-4'>
							<label htmlFor='category'>Category</label>
							<select
								id='category_id'
								name='category_id'
								className='rowser-default custom-select'
								onChange={this.getSpecialization}
								required>
								<option value='0' selected='selected'>
									Select category
								</option>
								{this.state.categories.map((category, index) => (
									<option key={category.id} value={category.id}>{category.name}</option>
								))}
							</select>
						</div>
						<div className='p-2 pt-4'>
							<label htmlFor='specialization'>Specialization</label>
							<select
								id='specialization_id'
								name='specialization_id'
								className='rowser-default custom-select'
								onChange={this.getFilteredWorks}
								required>
								<option value='0' selected='selected'>
									Select specialization
								</option>
								{this.state.specialization.map((specialization, index) => (
									<option value={specialization.id}>
										{specialization.name}
									</option>
								))}
							</select>
						</div>
						<div className='p-2 pt-4'>
							<button
								id='btn-filter'
								onClick={this.resetFilter}
								className='btn text-white'>
								Reset Filter
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}
