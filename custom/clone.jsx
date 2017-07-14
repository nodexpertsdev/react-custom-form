// import metoer packages;
import React                    from 'react';
import { _ }                    from 'meteor/underscore';
import { Random }               from 'meteor/random';

// Components
import CustomForm               from './form.jsx';

class ClonComponent extends React.Component {
    constructor(props) {
        super(props);

        // this.renderFileUpload = this.renderFileUpload.bind(this);
        
        this.addItem            = this.addItem.bind(this);
        this.focus              = this.focus.bind(this);
        this.renderClonElements = this.renderClonElements.bind(this);

        this.state = {
            value : [],
            valid : false,
            clon  : []
        };
    }

    componentDidMount() {
        let that   = this;
        let fields = [];
        const { values, formData } = this.props;

        _.map(values, function (item, key) {
            let formFields = formData.fields;
            let parentElement = {
                id: Random.id(),
                fields: formFields,
                values:item
            };
            fields[key] = parentElement;
        });

        /*if(!fields.length) {
            let formFields = formData.fields;
            let parentElement = {
                id:     Random.id(),
                fields: formFields,
                values: {}
            };
            fields[0] = parentElement;
        }*/

        that.setState({
            clon: fields
        });

        this.handleChange();
    }

    addItem(event) {
        event.preventDefault();
        this.setState({
            clon: this.state.clon.concat({
                id: Random.id(),
                fields: this.props.formData.fields
            })
        });
    }

    clearData() {
        const { value } = this.state;
        let that = this;

        let newData = value.filter(function(item) {
            if(_.isEmpty(item)) {
                return false;
            }
            return true;
        });

        this.setState({
            value : newData
        });
        // console.log("The State Value",this.state.value, this.state.valid);

    }

    focus() {
        const { refs } = this;
        let valid = true;

        _.map(refs, function(item) {
            if(!item.state.valid && valid) {
                item.focus();
                valid = false;
            }
        });
    }

    handleChange() {
        // console.log("Handle Change inside custom form");
        const { refs }  = this;
        const { value } = this.state;
        const that      = this;

        let valid = true;

        _.map(refs, function(item, key) {
            if(item.state.valid) {
                value[key] = item.state.data;
            } else {
                valid      = false;
                value[key] = {};
            }
        });

        that.setState({
            valid: valid
        }, function() {
            that.clearData();
        });
    }

    removeItem(id) {
        const that = this;
        this.setState({
            clon: _.without(this.state.clon, _.findWhere(this.state.clon, {id: id}))
        },function() {
            that.handleChange();
        });
    }

    renderClonElements(clon, key) {
        let that = this;
        // console.log(clon, key);
        return (
            <div key={clon.id}>
                    <button onClick={this.removeItem.bind(this, clon.id)} className="btn btn-default">
                        <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                
                    <div className="panel panel-body row">
                        <CustomForm
                            ref          = { key } 
                            formData     = { clon.fields } 
                            values       = { clon.values } 
                            handleChange = { this.handleChange.bind(this) }
                        />
                    </div>
                
            </div>
        )

    }

    render() {
        if (!this.state.clon) {    
            return (
                <div></div>
            )
        }

        let count = 0;
        let that = this;
        // console.log(this.state.clon);
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel panel-heading">
                        {this.props.formData.label}
                    </div>

                    <div className="panel panel-body">
                        {_.map(this.state.clon, this.renderClonElements)}
                        
                            <button onClick={this.addItem} className="btn btn-success">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default ClonComponent;