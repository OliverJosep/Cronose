import React, { Component } from "react";

class LanguagePicker extends Component {
  render() {
    const { changeLanguage } = this.props;
    return (
      <div className="btn-group languagesButtons" role="group">
        <button
          id="en"
          type="button"
          // className='btn btnlan'
          onClick={changeLanguage}
        >
          EN
        </button>
        <button
          id="es"
          type="button"
          //className='btn btnlan'
          onClick={changeLanguage}
        >
          ES
        </button>
        <button
          id="ca"
          type="button"
          //className='btn btnlan active'
          onClick={changeLanguage}
        >
          CA
        </button>
      </div>
    );
  }
}

export default LanguagePicker;
