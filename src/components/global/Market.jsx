import React, { Component } from 'react';
import Axios from 'axios';
import {
	IoIosArrowDropleftCircle,
} from 'react-icons/io';
import WorkCard from './WorkCard';
import qs from 'qs';
import  { LocaleContext } from '../../contexts/LocaleContext';
import Loader from '../layouts/Loader';


export default class Market extends Component {
	static contextType = LocaleContext;
	constructor(props) {
		super(props);
		this.state = {
			lang: [],
			works: [],
			categories: [],
			specialization: [],
			loaded: false
		};

		this.getWorks = this.getWorks.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.getSpecialization = this.getSpecialization.bind(this);
		this.getFilteredWorks = this.getFilteredWorks.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
	}

	componentDidMount() {
		this.setState((state) => {
			return {lang: this.context.lang};
		})

		this.getWorks();
		this.getCategories();
	}

	componentDidUpdate() {
    if(this.state.lang !== this.context.lang){
			this.getCategories();
			this.getSpecialization();
			this.state.specialization ? this.getFilteredWorks() : this.getWorks();
			this.setState((state) => {
				return {lang: this.context.lang};
			})
		}
	}

	// Get Works

	getWorks() {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/${this.context.lang}/works/all/0/10`
		).then((response) =>
			this.setState({ works: response.data || this.state.works, loaded: true })
		);
	}

	// Fliter

	getFilteredWorks() {
		const category_id = document.getElementById('category_id').value;
		const specialization_id =
			category_id !== '0'
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
					defaultLang: this.context.lang,
				},
			})
		).then((response) => this.setState({ works: response.data }));
	}

	resetFilter() {
		this.setState({ categories: [], specialization: [] });
		this.getWorks();
		this.getCategories();
	}

	// Get category and specialization

	getCategories() {
		Axios.get(
			`${process.env.REACT_APP_API_URL}/${this.context.lang}/categories`
		).then((response) => this.setState({ categories: response.data }));
	}

	getSpecialization() {
		const category_id = document.getElementById('category_id').value;
		Axios.get(
			`${process.env.REACT_APP_API_URL}/${this.context.lang}/category/${category_id}`
		).then((response) => this.setState({ specialization: response.data }));
		this.getFilteredWorks();
	}

	render() {
		if (!this.state.loaded) return <><Loader/></>;
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
							user={this.context.user}
						/>
					))}
				</section>
				<input type='checkbox' name='toggle' id='filter-toggle'></input>
				<label htmlFor='filter-toggle' id='btn-filter'>
					<IoIosArrowDropleftCircle />
				</label>
				{/* <span id='btn-show' >
				</span> */}

				<div className='filter'>
					<span id='btn-hide'>
						{/* <IoIosArrowDroprightCircle /> */}
					</span>
					<h2 className='p-3 pt-4 text-center'>Job Filter</h2>
					<div className='input-group p-2'>
						<div className='p-2 pt-4'>
							<label htmlFor='category'>Category</label>
							<select
								id='category_id'
								name='category_id'
								className='rowser-default custom-select'
								onChange={this.getSpecialization}
								defaultValue='0'
								required>
								<option value='0'>
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
								defaultValue='0'
								required>
								<option value='0'>
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
								id='btn-reset'
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
