// import react
import React from 'react';
import PropTypes from 'prop-types';

// import components
import InputError           from '../error.jsx';

// import helpers
import helpers              from '../helper.js';

class TextAreaInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value           : this.props.value,
            valid           : false,
            errorMessage    : 'Input is invalid',
            errorVisible    : false,
            validClass      : ''
        };
    }

    componentDidMount() {
        let that = this;
        
        this.handleChange();
        this.setState({
            errorVisible : false,
            validClass: ''
        });

        if (this.props.editor) {
            let $prop = $('#' + this.props.name);
            if (this.props.toolbar == 'basic') {
                $prop.froalaEditor({
                    placeholderText: this.props.text,
                    height: 200,
                    toolbarButtons: ['undo', 'redo', 'bold', 'italic', 'underline', 'alert', 'clear', 'insert']
                });
            } else {
                $prop.froalaEditor({
                    placeholderText: this.props.text,
                    height: 200
                });
            }
            $prop.on('froalaEditor.blur', function (e, editor) {
                that.handleBlur();
            });
            $prop.on('froalaEditor.contentChanged', function (e, editor) {
                that.handleChange();
            });
        }
    }

    focus() {
        this.refs[this.props.name].focus();
        this.handleChange();
        return;
    }

    handleChange() {
        var valid = true;
        this.validation(this.refs[this.props.name].value, valid); 
    }

    validation(value, valid) {
        let that = this;

        //The valid variable is optional, and true if not passed in:
        if (typeof valid === 'undefined') {
          valid = true;
        }
        
        let message = '';
        let errorVisible = false;

        const { required, minCharacters, maxCharacters } = this.props;
        const { emptyMessage, errorMessage, minCharactersMessage, maxCharactersMessage  } = this.props;

        //we know how to validate text fields based on information passed through props
        if (required && value == '') {
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
          message       = maxCharactersMessage || 'This Field must be less than '+ maxCharacters +' Characters';
          valid         = false;
          errorVisible  = true;
        }

        const validClass = helpers.validClass( required, valid );
      
        this.setState({
            errorMessage : message,
            value,
            valid,          
            errorVisible,
            validClass

        }, function() {
            if(this.props.handleChange) {
                this.props.handleChange();
            }
        });
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label htmlFor={this.props.name}>{this.props.label}</label>
            );
        }
    }

    render() {
        const { props, state }                                      = this;
        const { name, text, password, disabled, rows, column }      = props;
        const { value, errorVisible, errorMessage }                 = state;

        return (
            <div className={this.state.validClass}>
                { this.renderLabel() }
                <textarea
                    id          = { name }
                    placeholder = { text }
                    rows        = { rows }
                    cols        = { column }
                    className   = { 'form-control' }
                    onChange    = { this.handleChange }
                    onBlur      = { this.handleChange }
                    value       = { value }
                    ref         = { name }
                    disabled    = { disabled }
                >

                </textarea>

                <InputError
                    visible      = { errorVisible }
                    errorMessage = { errorMessage }
                />
            </div>
        )
    }
}

TextAreaInput.propTypes = {
    name : PropTypes.string.isRequired
};

export default TextAreaInput;