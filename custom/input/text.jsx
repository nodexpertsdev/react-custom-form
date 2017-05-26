// import metoer packages;
import React, { Component, PropTypes } from 'react';

// import components
import { InputError }                  from '../error.jsx';

export  class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    //this.renderLabel  = this.renderLabel.bind(this);

    //most of these variables have to do with handling errors
    this.state = {
      value: this.props.value,
      valid: false,
      errorMessage: "Input is invalid",
      errorVisible: false
    };
  }

  componentDidMount() {
    this.handleChange();
    this.setState({
      errorVisible : false
    });
  }

  focus() {
    this.refs[this.props.name].focus();
    this.handleChange();
    return;
  }
 
  handleChange(event){
    let valid = false;

    const { refs } = this;
    const { name, type } = this.props;

    if(type == "email") {
      valid = this.validateEmail(refs[name].value);
    }
    else if(type == "number") {
      valid = this.validateNumber(refs[name].value);
    }
    else if(type == "password") {
      valid = true;
    }
    else if(type == "name") {
      valid = this.validateName(refs[name].value);
    }
    else if(type == "confirmPassword") {
        valid = true;
    }
    else if(type == "text") {
        valid = true;
    }
    else if(type == "url") {
        valid = this.validateURL(refs[name].value);
    }
    this.validation(refs[name].value, valid);
  }
 
  validation (value,valid) {
    let that = this;

    //The valid variable is optional, and true if not passed in:
    if (typeof valid === 'undefined') {
      valid = true;
    }
    
    let message = "";
    let errorVisible = false;

    const { required, minCharacters, maxCharacters } = this.props;
    const { emptyMessage, errorMessage, minCharactersMessage, maxCharactersMessage  } = this.props;

    //we know how to validate text fields based on information passed through props
    if (required && value == "") {
      message       = emptyMessage || 'Required';
      valid         = false;
      errorVisible  = true;

    } else if (!valid) {
      message       = errorMessage || 'Please enter a valid value';
      valid         = false;
      errorVisible  = true;

    } else if (value.length < minCharacters) {
      message       = minCharactersMessage || 'This Field must be '+ minCharacters +' Characters long';
      valid         = false;
      errorVisible  = true;

    } else if (value.length >= maxCharacters) {
      message       = maxCharactersMessage || "This Field must be less than "+ maxCharacters +" Characters";
      valid         = false;
      errorVisible  = true;
    }
    
    this.setState({
      value        : value,
      valid        : valid,
      errorMessage : message,
      errorVisible : errorVisible
    }, function() {
      if(this.props.handleChange) {
        this.props.handleChange();
      }
    });
  }
  
  validateEmail(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  validateName(value) {
    let re1=/^[a-zA-Z][a-zA-Z0-9. _]+$/;
    return re1.test(value);
  }

  validateURL(value) {
    // regex from http://stackoverflow.com/questions/18568244/url-validation-regex-url-just-valid-with-http
    var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(value);
  }

  validateNumber(value) {
    return !isNaN(value);

  }

  validateConfirmPassword(password,confirmPassword){
    if(password == confirmPassword){
      this.validation(confirmPassword, true);
    }
    else{
      this.validation(confirmPassword, false);
    }

  }

  renderLabel() {
      if (this.props.label) {
          return (
              <label htmlFor={this.props.name}>{this.props.label}</label>
          );
      }
  }

  render() {
    const { props, state }                      = this;
    const { name, text, password, disabled }    = props;
    const { value, errorVisible, errorMessage } = state;
    return (      
      <div>
        {this.renderLabel()}
        <input
          type        = { password }  
          name        = { name } 
          ref         = { name }
          id          = { name } 
          className   = { "form-control input " } 
          placeholder = { text }
          onChange    = { this.handleChange } 
          onBlur      = { this.handleChange }
          defaultValue= { value }
          disabled    = { disabled } 
        />

        <InputError 
          visible      = { errorVisible } 
          errorMessage = { errorMessage }
        />
      </div>
    );
  }
};

TextInput.propTypes = {
  name : PropTypes.string.isRequired
};
