import React, { Component } from 'react'
import { LocaleContext } from '../../../contexts/LocaleContext';
import Axios from 'axios';
import Translate from '../../../translations/Translate';

export default class EditWork extends Component {
	static contextType = LocaleContext;
  constructor (props) {
    super(props);
    this.state = {

    }
    this.getWork = this.getWork.bind(this);
    this.updateTranslations = this.updateTranslations.bind(this);
  }

  componentDidMount() { 
    this.getWork();
  }

  getWork(){
    const { specialization } = this.props.match.params;
    Axios.get(`${process.env.REACT_APP_API_URL}/work/translations`, {
        params: {
          user_id: this.context.user.id,
          specialization_id: specialization
        }
      })
      .then((response) => {
        this.setState({ translations: response.data, loaded: true }, function() {
          console.log(this.state)
        });
      })
  }

  updateTranslations(e, lang) {
    // console.log(lang)
    const { specialization } = this.props.match.params;
		e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('user_id', this.context.user.id)
    formData.set('specialization_id', specialization)
    Axios.post(
			`${process.env.REACT_APP_API_URL}/work/translations`, formData
		)


  }

  render() {
    if (!this.state.loaded) return (<div>Loading</div>);
    const {user} = this.context
    return (
      <div className='container edit_profile'>
        <h1 className='text-center mt-4'>Edit Work</h1>
        <div className='mt-4 box'>
          <div className='title p-2'>
            Description | <span className='user'>{user.initials}#<span className='text-muted'>{user.tag}</span></span>
          </div>
          <div className='body'>
            
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
              <input
                className='btn btn-lg btn-register w-100 mt-3 text-white'
                type='submit'
                value='Update'
              />
              </form>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
