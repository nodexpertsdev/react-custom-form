// import react
import React, { Component, PropTypes } from 'react';

// import components
import { InputError }                  from '../error.jsx';

export class MultipleSelectInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value           : ( this.props.value || [] ), // For multiple, array is needed
            options         : ( this.props.options || [] ),
            isEmpty         : true,
            valid           : false,
            errorMessage    : "Input is invalid",
            errorVisible    : false
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


    handleChange() {
        let value = [];
        _.map(this.refs,function(item, i) {
            if(item.tagName && item.tagName == "OPTION" && item.selected==true ){
                value.push(item.value);
            }
        });
        value && value.length >=1 ? this.validation(value, true) : this.validation(value) ;
    }

    

    validation (value, valid) {
        const { required, emptyMessage, errorMessage } = this.props;

        if (typeof valid === 'undefined') {
          valid = true;
        }
        
        let message = "";
        let errorVisible = false;

        if (required && value.length < 1) {
          message       = emptyMessage || 'Required';
          valid         = false;
          errorVisible  = true;
        }
        else if (!valid) {
          message       = errorMessage || 'Please enter a valid value';
          valid         = false;
          errorVisible  = true;
        }
        
        this.setState({
            value: value,
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        }, function() {
          if(this.props.handleChange) {
            this.props.handleChange();
          }
        });
    }

    renderOption(dataRow, key) {
        return (
            <option key={dataRow.key} ref = { 'option'+key }  value={dataRow.key}>{dataRow.value}</option>
        );
    }

    render() {
        const { state, props }                               = this;
        const { name, disabled, defaultOption }              = props;
        const { value, errorVisible, errorMessage, options } = state;

        const that = this;
        return (
            <div>
                <select 
                    multiple     = { true } 
                    disabled     = { disabled } 
                    defaultValue = { value } 
                    ref          = { name } 
                    onBlur       = { this.handleChange } 
                    className    = { "form-control" } 
                    onChange     = { this.handleChange } >
                    {
                        options.map(function(dataRow, key) {
                            return that.renderOption(dataRow, key);
                        })
                    }
                </select>
                <InputError 
                    visible      = { errorVisible } 
                    errorMessage = { errorMessage }
                />
            </div>
        )
    }
};

MultipleSelectInput.propTypes = {
  name : PropTypes.string.isRequired
};
