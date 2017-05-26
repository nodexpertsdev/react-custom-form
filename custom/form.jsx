// import metoer react packages;
import React, { Component }     from 'react';
import { _ }                    from 'meteor/underscore';

// import components
import { CheckboxInput }        from './input/checkbox.jsx';
import { FileInput }            from './input/file.jsx';
import { InputError }           from './error.jsx';
import { MultipleSelectInput }  from './input/multiSelect.jsx';
import { RadioInput }           from './input/radio.jsx';
import { SelectInput }          from './input/select.jsx';
import { TextAreaInput }        from './input/textarea.jsx';
import { TextInput }            from './input/text.jsx';

// import helpers
import helpers                  from './helper.js';

export class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.focus            = this.focus.bind(this);

        this.state = {
            value    : [],
            valid    : false,
            data     : {},
            focus    : this.focus,
            formData : this.props.formData
        };
    }

    componentWillMount() {
        const { formData, values }   = this.props;

        this.setState({
            formValues : helpers.modifyValues(formData, values)
        })
    }

    componentDidMount() {
        this.handle();
    }

    componentWillReceiveProps(nextProps, nextState) {        
        if (this.props.formData != nextProps.formData) {
            this.setState({formData: nextProps.formData ? nextProps.formData : []});
        }
    }

    focus() {
        const { value } = this.state;
        const { refs }  = this;

        let focus = false;

        _.map(value, function(element, key) {
            if(element.valid == false && !focus) {

                key += 1;
                focus = true;
                refs[element.type+key].focus();
            }
        });
    }

    handleChange(id , field) {
        let that  = this;
        let valid = true;

        const { data, value } = this.state;
        const { refs } = this;

        _.map(value, function(element, key) {
            if(element.id == id) {
                element.value = refs[field].state.value;
                element.valid = refs[field].state.valid;

                if(!refs[field].state.valid) {
                    valid = false;
                    data[element.id] = '';

                } else {
                    data[element.id] = refs[field].state.value
                }
            }

            key += 1;
            if(!refs[element.type+key].state.valid) {
                valid = false;
            }

            return element;
        });

        that.setState({
            valid : valid

        }, function() {
            if(that.props.handleChange) {
                that.props.handleChange();
            }
        });
    }

    handle() {
        const that  = this;

        const { refs }      = this;

        const { data, formData, value } = this.state;

        _.map(formData,function(element , key){
            key = key+1;

            let temp = {
                id      : element.id,
                type    : element.field,
                value   : refs[element.field+key].state.value,
                valid   : refs[element.field+key].state.valid
            }

            value.push(temp);

            if(refs[element.field+key].state.value) {
                data[element.id] = refs[element.field+key].state.value
            }            
        });

        if(this.props.handleChange) {
            this.props.handleChange();
        }
    }

    renderFileInput(element) {
        const imageCrop = function(name) {
            name = name.replace("upload","upload/w_320,c_scale");
            return name;
        };

        if(element.type=="image") {            
            return (
                <div>
                    <br />
                    <img src={imageCrop(this.state.formValues[element.id])} />
                </div>
            );

        } else if(element.type=="video") {
            return (
                <div>
                    <br />
                    <video width="320" height="240"   controls>
                        <source  src={this.props.formValues[element.id]} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        } 
    }

    renderLabel(field, label, required, i) {
        return ( label ? <label htmlFor = { field+i } >{ label }{ required ? "*" : "" }</label> : '' );
    }

    renderCustomForm(element, i) {
        const { formValues } = this.state;
        const that           = this;

        const { 
            field, 
            type, 
            placeholder, 
            isRequired, 
            minRange, 
            maxRange, 
            id, 
            label 
        } = element;

        const minCharacters = minRange || undefined;
        const maxCharacters = maxRange || undefined;

        const customProps = {
            type                    : type,
            name                    : field+i,
            text                    : placeholder,
            handleChange            : this.handleChange.bind(this, id, field+i),
            onChange                : element.onChange ? element.onChange.bind(this) : null,
            ref                     : field+i, 
            password                : type == "password" ? type : undefined, 
            required                : isRequired,
            minCharacters           : minCharacters,
            maxCharacters           : maxCharacters,
            errorMessage            : "Please enter a valid "+type,
            emptyMessage            : "This Field is Required",
            minCharactersMessage    : "This Field must be "+minRange+" Characters long",
            maxCharactersMessage    : "This Field must be less than "+maxRange+" Characters",
            value                   : formValues && formValues[id] ? formValues[id] : ""
        };

        if(field == "singleLineText") {
            return(
                <div key={ field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <TextInput { ...customProps } />
                </div>
            )
        }

        else if(field == "paragraphText") {
            return(
                <div key = { field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <TextAreaInput { ...customProps } />
                </div>
            )
        }

        else if(field == "fileUpload") {
            if(element.multiple) {
                customProps.multiple = true;
            }
            
            customProps.required = formValues && formValues[element.id] ? false : customProps.required;
            customProps.image    = formValues && formValues[element.id] ? formValues[element.id] : null;
            customProps.ext      = element.ext || ''; 

            return(
                <div key ={ field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }
                    { formValues && formValues[element.id] ? this.renderFileInput(element) :"" }
                    <FileInput { ...customProps } />
                </div>
            )
        }

        else if(field == "multipleCheckbox") {   
            customProps.choices = element.choices;
            if(formValues && formValues[element.id] && formValues[element.id].length > 0) {
                customProps.choices = formValues[id];
            }

            return(
                <div key = { field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <CheckboxInput { ...customProps } />
                </div>
            )
        }

        else if(field == "checkbox") {
            customProps.choices = [{
                value:element.choice,
                isChecked:element.isChecked
            }];

            if(formValues && formValues[element.id] && formValues[element.id].length > 0) {
                customProps.choices = formValues[id];
            }

            return(
                <div key = { field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <CheckboxInput { ...customProps }  />
                </div>
            )
        }

        else if(field == "multipleChoice") {
            customProps.choices = element.choices;
            if(formValues && formValues[element.id] && formValues[element.id].length > 0) {
                customProps.choices = formValues[id];
            }

            return(
                <div key={ field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <RadioInput { ...customProps } />
                </div>
            )
        }

        else if(field == "dropdown") {
            customProps.options         = element.choices;
            customProps.defaultOption   = element.defaultOption;
            
            return(
                <div key = { field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <SelectInput { ...customProps } />
                </div>
            )
        }

        else if(field == "multiSelectDropdown") {
            customProps.options         = element.choices;
            
            return(
                <div key = { field+i } className="form-group ">
                    { this.renderLabel(field, label, isRequired, i) }

                    <MultipleSelectInput { ...customProps } />
                </div>
            )
        }        
    }
    
    renderForm() {
        let count = 0;
        let that  = this;
        const { formData }  = this.state;

        return formData.map(function(element) {
            if(element.field != "custom") {
                count++;
                return that.renderCustomForm(element, count);
            }
            
            return(  
                <div key={element.id}>
                    <label htmlFor="fdj">{ element.label }</label>
                    <div  className="m-l-10">
                        {
                            element.fields.map(function(fElement) {
                                count++;
                                return that.renderCustomForm(fElement, count);
                            })
                        }
                    </div>
                </div>
            );
        });
    }    

    render() {
        const { formData } = this.state;

        if (!formData) {
            return (
                <div></div>
            );
        }

        return (
            <div>
                { this.renderForm() }
            </div>                          
        );
    }
}
