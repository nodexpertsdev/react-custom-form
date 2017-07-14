// import react
import React from 'react';
import PropTypes from 'prop-types';

// import components
import InputError           from '../error.jsx';

// import helpers
import helpers              from '../helper.js';

class SelectInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value        : this.props.value,
            options      : ( this.props.options || [] ),
            valid        : false,
            errorMessage : 'Input is invalid',
            errorVisible : false,
            disabled     : this.props.disabled === true ? true : false,
            validClass   : ''
        };
    }
    
    componentDidMount() {
        this.handleChange();
        this.setState({
            errorVisible : false,
            validClass: ''
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
        //console.log(nextProps, nextState);
        if (this.props.options != nextProps.options) {
            this.setState({options: nextProps.options ? nextProps.options : []});
        }
    }

    focus() {
        this.refs[this.props.name].focus();
        this.handleChange();
        return;
    }

    

    handleChange(event) {
        var valid=true;
        this.validation(this.refs[this.props.name].value, valid);
     
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }

    validation (value, valid) {

        const { required, emptyMessage, errorMessage } = this.props;

        if (typeof valid === 'undefined') {
          valid = true;
        }
        
        let message = '';
        let errorVisible = false;

        if (required && value=='') {
            message       = emptyMessage || 'Required';
            valid         = false;
            errorVisible  = true;
        }
        else if (!valid) {
            message       = errorMessage || 'Please enter a valid value';
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

    renderOption(dataRow) {
        //console.log(dataRow);
        let key = dataRow.key ? dataRow.key : dataRow.value;
        return (
            <option key={ key } value={ key }>{ dataRow.value }</option>
        );
    }

    renderLabel() {
        const { label, name } = this.props;
        if (label) {
            return (
                <label htmlFor = { name }>{ label }</label>
            );
        }
    }

    render() {
        const { state, props }                               = this;
        const { name, disabled, defaultOption }              = props;
        const { value, errorVisible, errorMessage, options } = state;

        return (
            <div className={this.state.validClass}>
                {this.renderLabel()}
                <select 
                    ref         = { name }
                    id          = { name } 
                    className   = { 'form-control input ' } 
                    onChange    = { this.handleChange }
                    onBlur      = { this.handleChange }
                    value       = { value }
                    disabled    = { disabled }
                >
                    <option value=''>{ defaultOption ? defaultOption: '--Please Select--' }</option>
                    {
                        options.map((dataRow) => {
                            return this.renderOption(dataRow);
                        })
                    }
                </select>
                <InputError 
                 visible        = { errorVisible } 
                 errorMessage   = { errorMessage }
                />
            </div>
        )
    }
};

SelectInput.propTypes = {
    name : PropTypes.string.isRequired
};

export default SelectInput;