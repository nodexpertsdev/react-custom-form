// import react packages;
import React, { Component, PropTypes } from 'react';

// import components
import { InputError }                  from '../error.jsx';

export class FileInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange   = this.handleChange.bind(this);
        //this.validateImage  = this.validateImage.bind(this);
        this.focus          = this.focus.bind(this);

        this.state = {
            value: this.props.value,
            isEmpty: true,
            valid: false,
            errorMessage: "Input is invalid",
            errorVisible: false
        };
    }

    focus() {
        this.refs[this.props.name].focus();
        return;
    }

    componentDidMount() {
        this.handleChange();
        this.setState({
          errorVisible : false
        })
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

        const index = extensions.indexOf(extension);
        const valid = index != -1;

        return valid;
    }

    // validateImage(extension) {
    //     const extensions = this.props.ext ? this.props.ext : [
    //             "jpeg", "jpg", "jfif", "exif", "tiff",
    //             "gif", "bmp", "png", "ppm", "pgm", "pbm", "pnm",
    //             "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg"
    //         ];

    //     const index = extensions.indexOf(extension);
    //     const valid = index != -1;

    //     return valid;
    // }

    // validateVideo(extension) {
    //     const extensions = this.props.ext ? this.props.ext : [
    //             "ogv", "mp4", "webm", "mkv", "flv", "vob", "ogg", "drc", "avi", "wmv", "3gp", "mpeg"
    //         ];

    //     const index = extensions.indexOf(extension);
    //     const valid = index != -1;

    //     return valid;
    // }

    // validateCSV(extension) {
    //     let valid = false;
    //     if (this.props.ext) {
    //         var index = this.props.ext.indexOf(extension);
    //         valid = index != -1;
    //     }
    //     else {
    //         let extensions = ["csv"];
    //         var index = extensions.indexOf(extension);
    //         valid = index != -1;
    //     }
    //     return valid;
    // }

    handleChange(event) {
        let valid = undefined;

        const { refs, props } = this;
        const { name, type }  = props;

        let value  = refs[name].value;
        let result = [];

        if (value) {
            result = value.split(".");
            let extension = result[result.length - 1];
            // if (type == "image") {
            //     valid = this.validateImage(extension);
            // } else if (type == "video") {
            //     valid = this.validateVideo(extension);
            // } else if (type == "csv") {
            //     valid = this.validateCSV(extension);
            // }

            valid = this.isValid(extension, type);
        }

        this.validation(value, valid);
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
        if(!files.length) {
            if(image) {
                valid = true;
            }

            this.setState({
                value: image,
                valid: valid,
                errorMessage: message,
                errorVisible: errorVisible
            },function(){
                if (that.props.handleChange) {
                    that.props.handleChange();
                }
            });

            return;
        }

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
                if(count == files.length) {
                    that.setState({
                        value: values,
                        valid: valid,
                        errorMessage: message,
                        errorVisible: errorVisible
                    }, function(){
                        if (that.props.handleChange) {
                            that.props.handleChange();
                        }
                    });
                }

            }
        });
    }

    render() {
        const { props, state }                      = this;
        const { name, multiple, disabled }          = props;
        const { value, errorVisible, errorMessage } = state;
        return (
            <div>
                <input
                    type      = { "file" }
                    name      = { name }
                    ref       = { name }
                    id        = { name }
                    className = { "form-control" }
                    onChange  = { this.handleChange }
                    onBlur    = { this.handleChange }
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
