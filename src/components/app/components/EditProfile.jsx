import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import { LocaleContext } from '../../../contexts/LocaleContext';
import Translate from '../../../translations/Translate';

export default class EditProfile extends Component {
	static contextType = LocaleContext;
	constructor(props) {
		super(props);
		this.state = { 
      province: [], 
      cities: [], 
      descriptions: [],
      password: [],
      equals: false
    };
		this.getProvinces = this.getProvinces.bind(this);
		this.getCities = this.getCities.bind(this);
		this.getDescriptions = this.getDescriptions.bind(this);
		this.updateUserData = this.updateUserData.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	componentDidMount() {
    this.getProvinces();
    this.getDescriptions();
	}

	getCities() {
		const province_id = document.getElementById('province_id').value;
		Axios.get(`${process.env.REACT_APP_API_URL}/cities/${province_id}`)
			.then((response) => {
				this.setState({ cities: response.data || this.state.cities });
			})
      .catch((err) => console.error(err));
      console.log(this.state)
	}

	getProvinces() {
		Axios.get(`${process.env.REACT_APP_API_URL}/provinces`)
			.then((response) => this.setState({ province: response.data }))
      .catch((err) => console.error(err));

  }

  getDescriptions() {
    Axios.get(`${process.env.REACT_APP_API_URL}/user/description/${this.context.user.id}`)
      .then((response) => {
        this.setState({ descriptions: response.data }, function () {
				  console.log(this.state)
        })
      });
  }
  
  updateUserData(e) {
		e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('user_id', this.context.user.id);
    formData.delete('province_id');
    Axios.post(
			`${process.env.REACT_APP_API_URL}/user/update`, formData
		).then((response) => {
      this.context.updateUser(this.context.user.id);
		});
  }
  
  updateDescription(e) {
		e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('user_id', this.context.user.id);
    Axios.post(
			`${process.env.REACT_APP_API_URL}/user/description`, formData
		).then((response) => {
      this.context.updateUser(this.context.user.id);
		});
	}
  
  updatePassword(e) {
		e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('user_id', this.context.user.id);
    let old_password = md5(formData.get('old_password'));
    let new_password = md5(formData.get('new_password'));
    let repeat_password = md5(formData.get('repeat_password'));
    formData.delete(old_password, new_password, repeat_password);
		formData.set('password', new_password);
    if (new_password === repeat_password) this.setState({equals: true});
    Axios.get(`${process.env.REACT_APP_API_URL}/password/${this.context.user.id}`)
      .then((response) => {
        this.setState({password: response.data.password}, function() {
          if (old_password === this.state.password && this.state.equals) {
            Axios.post(`${process.env.REACT_APP_API_URL}/reset_password`, formData)
            .then((response) => {
              this.setState({password: '', equals: false});
            })
            .finally(function() {
              this.context.updateUser(this.context.user.id);
            });
          }
        })
      })
    
	}

  render() {
    const user = this.context.user
    return (
      // Username, email and city
      <div className='container edit_profile'>
        <h1 className='text-center mt-4'>Edit Profile</h1>
        <div className='mt-4 box'>
          <div className='title p-2'>
            Edit User | <span className='user'>{user.initials}#<span className='text-muted'>{user.tag}</span></span>
          </div>
          <div className='body'>
            <form
						id='update_form'
						method='post'
						target='_self'
						className='form-signin'
						onSubmit={this.updateUserData}
            >
              <div className='row pt-4'>
                <div className='col-3 text-right pr-3'>
                  <label htmlFor='full_name'>Name</label>
                </div>
                <div className='col-7'>
                  <input id='full_name'
                    name='full_name' 
                    className='form-control'
                    type='text'  
                    value={user.full_name ? user.full_name : 'Private account'}
                    disabled/>
                </div>
              </div>
              <div className='row'>
                <div className='mt-3 col-3 text-right pr-3'>
                  <label htmlFor='email'>Email</label>
                </div>
                <div className='mt-3 col-7'>
                  <input 
                    id='email'
                    name='email' 
                    className='form-control' 
                    type='text' 
                    defaultValue={user.email}/>
                </div>
              </div>
              <div className='row'>
                <div className='mt-3 col-3 text-right pr-3'>
                  <label htmlFor='province_id'>Province</label>
                </div>
                <div className='mt-3 col-7'>
                  <select
                    id='province_id'
                    name='province_id'
                    className='form-control'
                    onChange={this.getCities}
                    defaultValue='0'
                    required>
                    <option defaultValue={user.address.province.id} value={user.address.province.id}>
                      {user.address.province.name}
                    </option>
                    {this.state.province.map((province, index) => (
                      <option key={index} value={province.id}>{province.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='mt-3 col-3 text-right pr-3'>
                  <label htmlFor='city_cp'>City</label>
                </div>
                <div className='mt-3 col-7'>
                  <select
                    id='city_cp'
                    name='city_cp'
                    className='form-control'
                    defaultValue='0'
                    required>
                    <option defaultValue={user.address.city.cp} value={user.address.city.cp}>
                      {user.address.city.name}
                    </option>
                    {this.state.cities.map((cities, index) => (
                      <option key={index} value={cities.cp}>{cities.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='mt-3 col-3 text-right pr-3'>
                  <label htmlFor='private'>Private</label>
                </div>
                <div className='mt-3 col-7'>
                  <input id='private' name='private' defaultChecked={user.private==='1'} type='checkbox'/>
                </div>
              </div>
              <input
                className='btn btn-lg btn-register w-100 mt-3 text-white'
                type='submit'
                value='Save changes'
              />
            </form>
          </div>
        </div>
          {/* DESCRIPTION */}
        <div className='mt-4 box'>
          <div className='title p-2'>
            Description | <span className='user'>{user.initials}#<span className='text-muted'>{user.tag}</span></span>
          </div>
          <div className='body'>
            <form
						id='description_form'
						method='post'
						target='_self'
						className='form-signin'
						onSubmit={this.updateDescription}
            >
            {this.state.descriptions && this.state.descriptions.map((description, index) => (
              <div className='row pt-4'>
              <div className='col-3 text-right pr-3'>
                <label htmlFor={description.language_id + '_description'}> <Translate string={description.language_id} /></label>
              </div>
              <div className='col-7'>
                <textarea id={description.language_id + '_description' }
                  name={description.language_id} 
                  className='form-control'
                  defaultValue={description.description}/>
              </div>
            </div>
            ))}
              <input
                className='btn btn-lg btn-register w-100 mt-3 text-white'
                type='submit'
                value='Save changes'
              />
            </form>
          </div>
        </div>
          {/* PASSWORD */}
        <div className='mt-4 mb-4 box'>
          <div className='title p-2'>
            Password | <span className='user'>{user.initials}#<span className='text-muted'>{user.tag}</span></span>
          </div>
          <div className='body'>
            <form
            id='password'
            method='post'
            target='_self'
            className='form-signin'
            onSubmit={this.updatePassword}
            >
              <div className='row pt-4'>
                <div className='col-3 text-right pr-3'>
                  <label htmlFor='old_password'>Old password</label>
                </div>
                <div className='col-7'>
                  <input id='old_password'
                    name='old_password' 
                    className='form-control'
                    type='password'
                    required
                    />
                </div>
              </div>
              <div className='row pt-4'>
                <div className='col-3 text-right pr-3'>
                  <label htmlFor='new_password'>New password</label>
                </div>
                <div className='col-7'>
                  <input id='new_password'
                    name='new_password' 
                    className='form-control'
                    type='password'  
                    required
                    />
                </div>
              </div>
              <div className='row pt-4'>
                <div className='col-3 text-right pr-3'>
                  <label htmlFor='repeat_password'>Repeat password</label>
                </div>
                <div className='col-7'>
                  <input id='repeat_password'
                    name='repeat_password' 
                    className='form-control'
                    type='password' 
                    required 
                    />
                </div>
              </div>
              <input
                className='btn btn-lg btn-register w-100 mt-3 text-white'
                type='submit'
                value='Save changes'
              />
            </form>
          </div>
        </div>
      </div>
    ) 
  }
}
