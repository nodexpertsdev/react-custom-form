// import react packages;
import React from 'react';
import PropTypes from 'prop-types';

// import components
import InputError           from '../error.jsx';

// import helpers
import helpers              from '../helper.js';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange   = this.handleChange.bind(this);
        //this.validateImage  = this.validateImage.bind(this);
        this.focus          = this.focus.bind(this);

        this.state = {
            value      : this.props.value,
            isEmpty: true,
            valid: false,
            errorMessage: "Input is invalid",
            errorVisible: false,
            fileNames: [],
            validClass      : ''
        };
    }

    componentDidMount() {
        this.handleChange();
        this.setState({
          errorVisible : false,
          validClass   : ''
        });
    }

    focus() {
        this.refs[this.props.name].focus();
        return;
    }

    handleChange(event) {
        let valid;

        const { refs, props } = this;
        const { name, type }  = props;

        let value  = refs[name].value;
        let result = [];

        if (value) {
            result = value.split(".");
            let extension = result[result.length - 1];
            valid = this.isValid(extension, type);
        }

        this.validation(value, valid);
    }

    isValid(extension, type) {
        const types = {
            'csv'   : ['csv'],
            'image' : [
                "jpeg", "jpg", "jfif", "exif", "tiff",
                "gif", "bmp", "png", "ppm", "pgm", "pbm", "pnm",
                "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg"
            ],
            'video' : [
                "ogv", "mp4", "webm", "mkv", "flv", "vob", "ogg", "drc", "avi", "wmv", "3gp", "mpeg"
            ]
        };

        const extensions = this.props.ext ? this.props.ext : types[type];

        if (!extensions) {
            return false;
        }

        extension = extension.toLowerCase();

        const index = extensions.indexOf(extension);
        const valid = index != -1;

        return valid;
    }

    validation(value, valid) {
        let that = this;

        const { refs, props }                  = this;
        const { name, type, required, image }  = props;
        const { emptyMessage, errorMessage, minCharactersMessage, maxCharactersMessage  } = props;

        if (typeof valid === 'undefined') {
            valid = true;
        }
        // console.log("The Image is", props);
        let files = refs[name].files;

        let message         = "";
        let errorVisible    = false;

        if (required && (!files || !files.length )) {
            message       = emptyMessage || 'Required';
            valid         = false;
            errorVisible  = true;
        }
        else if (!valid) {
            message       = errorMessage || 'This field is Required';
            valid         = false;
            errorVisible  = true;
        }

        let count = 0;
        let values = [];

        let validClass = helpers.validClass( required, valid );

        if(!files.length) {
            if(image) {
                valid = true;
            }

            this.setState({
                value: image,
                errorMessage: message,
                valid,                
                errorVisible,
                validClass

            },function() {
                if (that.props.handleChange) {
                    that.props.handleChange();
                }
            });

            return;
        }

        const fileNames = [];

        _.map(files, function(file) {
            let reader = new FileReader();
            if(type=='csv'){
              reader.readAsBinaryString(file);
            }
            else{
              reader.readAsDataURL(file);
            }
            reader.onload = function() {
                count++;
                values.push(this.result);
                fileNames.push(file.name);

                if(count == files.length) {
                    validClass = helpers.validClass( required, valid );

                    that.setState({
                        value: values,                        
                        errorMessage: message,
                        valid,
                        errorVisible,
                        fileNames,
                        validClass

                    }, function(){
                        if (that.props.handleChange) {
                            that.props.handleChange();
                        }
                    });
                }

            };
        });
    }

    render() {
        const { props, state }                      = this;
        const { name, multiple, disabled }          = props;
        const { value, errorVisible, errorMessage } = state;
        return (
             <div className={this.state.validClass}>
                <input
                    type      = { "file" }
                    name      = { name }
                    ref       = { name }
                    id        = { name }
                    className = { "form-control" }
                    onChange  = { this.handleChange }
                    onBlur    = { this.props.disableBlur ? null : this.handleChange }
                    disabled  = { disabled }
                    multiple  = { multiple }
                  />

                <InputError
                    visible      = { errorVisible }
                    errorMessage = { errorMessage }
                />
            </div>
        );
    }
}

FileInput.propTypes = {
  name : PropTypes.string.isRequired
};

FileInput.defaultProps = {
    disableBlur: false
};

export default FileInput;