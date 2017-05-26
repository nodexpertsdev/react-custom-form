// import react
import React, { Component, PropTypes } from 'react';

// import components
import { InputError }                  from '../error.jsx';

export  class RadioInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange   = this.handleChange.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);

    this.state = {
      value         : '',
      valid         : false,
      errorMessage  : "Input is invalid",
      errorVisible  : false
    };
  }

  componentDidMount() {
    this.handleChange();
    this.setState({
      errorVisible : false
    })
  }

  focus() {
    const { refs } = this;
    refs["checkbox0"].focus();
    this.handleChange();
    return;
  }
 
  handleChange() {
    let valid   = true;
    let value   = '';

    const { refs, props } = this;
    _.map(refs, function(item,i) {
        if(item.checked == true) {
          valid = true;
          let res = i.split("checkbox");
          value = props.choices[res[res.length-1]].value;
        }
    });
    this.validation(value, valid);
  }
 
  validation (value,valid) {
    const { required, emptyMessage } = this.props;

    if (typeof valid === 'undefined') {
      valid = true;
    }
    let message       = "";
    let errorVisible  = false;

    if (required && value == '') {
      message       = emptyMessage;
      valid         = false;
      errorVisible  = true;
    }
    
    this.setState({
      value       : value,
      valid       : valid,
      errorMessage: message,
      errorVisible: errorVisible
    }, function() {
      if(this.props.handleChange) {
        this.props.handleChange();
      }
    });
 
  }
  
  renderCheckbox(item,i) {
    const { name, disabled } = this.props;

    return(
      <div key = { i } className="checkbox input-radio">
        <label>
          <input 
            ref           = { "checkbox"+i } 
            disabled      = { disabled }  
            name          = { name } 
            onChange      = { this.handleChange } 
            type          = { "radio" }
            defaultChecked= { item.isDefault }  
          /> 
          { item.value }
        </label>
      </div>
      )
  }

  renderLabel() {
    if (this.props.label) {
      return (
          <label htmlFor = { this.props.name }>{ this.props.label }</label>
      );
    }
  }

  render() {
    const { errorVisible, errorMessage } = this.state;
    const { choices }                    = this.props;
    return (
      <div>
        { this.renderLabel() }
        { choices ? _.map(choices,this.renderCheckbox) : "" }
        <InputError 
            visible     = { errorVisible } 
            errorMessage= { errorMessage }
        />
      </div>
    );
  }
}


RadioInput.propTypes = {
  name    : PropTypes.string.isRequired,
  choices : PropTypes.array.isRequired
};