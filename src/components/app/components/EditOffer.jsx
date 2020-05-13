import React, { Component } from 'react'
import { LocaleContext } from '../../../contexts/LocaleContext';
import Axios from 'axios';
import Translate from '../../../translations/Translate';

export default class EditWork extends Component {
	static contextType = LocaleContext;
  constructor (props) {
    super(props);
    this.state = {
      lang: null,
      visibile: null
    }
    this.getWork = this.getWork.bind(this);
    this.getVisibility = this.getVisibility.bind(this);
    this.updateTranslations = this.updateTranslations.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);
  }

  componentDidMount() { 
    this.getWork();
    this.getVisibility();
  }

	componentDidUpdate() {
    if(this.state.lang !== this.context.lang){
			this.getSpecialization();
			this.setState((state) => {
				return {lang: this.context.lang};
			})
		}
	}

  getWork(){
    const { specialization } = this.props.match.params;
    Axios.get(`${process.env.REACT_APP_API_URL}/offer/translations`, {
        params: {
          user_id: this.context.user.id,
          specialization_id: specialization
        }
      })
      .then((response) => {
        this.setState({ translations: response.data, loaded: true }, function() {
          this.getSpecialization();
        });
      })
  }

  getSpecialization() {
    const { specialization } = this.props.match.params;
    Axios.get(`${process.env.REACT_APP_API_URL}/${this.context.lang}/specialization/${specialization}`)
      .then((response) => {
        this.setState({ specialization: response.data.name });
      })
  }

  getVisibility() {
    const { specialization } = this.props.match.params;
    Axios.get(`${process.env.REACT_APP_API_URL}/offer/visible`, {
      params: {
        user_id: this.context.user.id,
        specialization_id: specialization
      }
    }).then((response) => {
      this.setState({visibile: response.data.visibility})
    })
  }

  updateTranslations(e, lang) {
    const { specialization } = this.props.match.params;
		e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('user_id', this.context.user.id)
    formData.set('specialization_id', specialization)
    Axios.post(
			`${process.env.REACT_APP_API_URL}/offer/translations`, formData
		)
  }

  updateVisibility(e) {
    const { specialization } = this.props.match.params;
		e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('user_id', this.context.user.id)
    formData.set('specialization_id', specialization)
    Axios.post(
			`${process.env.REACT_APP_API_URL}/offer/switch`, formData
		)
  }

  render() {
    if (!this.state.loaded) return (<div>Loading</div>);
    const {user} = this.context
    return (
      <div className='container edit_profile'>
        <h1 className='text-center mt-4'>Edit Offer</h1>
        <div className='mt-4 box'>
          <div className='title p-2'>
            {this.state.specialization} | <span className='user'>{user.initials}#<span className='text-muted'>{user.tag}</span></span>
          </div>
          <div className='body edit_offer'>
            {this.state.translations && this.state.translations.map((translation, index) => (
            <form
              id='translations_form'
              method='post'
              target='_self'
              className='form-signin'
              onSubmit={this.updateTranslations}
              key={index}
              >
              <div className='row text-center pt-4'>
                <div className='col-12'>
                  <h4><Translate string={translation.language_id}/></h4>
                  <input id='lang'
                    name='lang'
                    defaultValue={translation.language_id}
                    readOnly
                    type='hidden'
                    />
                </div>
              </div>
              <div className='row pt-2 mb-2'>
                <div className='col-3 text-right pr-3'>
                  <label htmlFor='title'>Title</label>
                </div>
                <div className='col-7'>
                  <input id='title'
                    name='title'
                    className='form-control mb-3'
                    type='text'  
                    defaultValue={translation.title}
                    />
                </div>
                <div className='col-3 text-right pr-3'>
                  <label htmlFor='description'> Description</label>
                </div>
                <div className='col-7'>
                  <textarea 
                    id='description'
                    name='description' 
                    className='form-control'
                    defaultValue={translation.description}
                    />
                </div>
              </div>
              <div className='text-center bottom m-2 ml-4 mr-4'>
                <input
                  className='btn btn-register mt-3 mb-2 text-center text-white'
                  type='submit'
                  value='Update'
                />
              </div>
            </form>
            ))}
            <form
              id='visiblity_form'
              method='post'
              target='_self'
              className='form-signin'
              onSubmit={this.updateVisibility}
              >
              <div className='row text-center pt-4'>
                <div className='col-12'>
                  <h4>Visible</h4>
                  {this.state.visibile 
                  ? <>
                      <input 
                        type='checkbox'
                        id='visible' 
                        name='visible' 
                        defaultChecked={this.state.visibile==='1'}
                        />
                    </>
                  : <>Loading</>}
                </div>
                  
                <div className='col-12'>  
                <input
                  className='btn btn-register mt-3 mb-2 text-center text-white'
                  type='submit'
                  value='Update'
                />
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
