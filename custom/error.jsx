// import metoer packages;
import React from 'react';
class InputError extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){ 
        const errorClass = this.props.visible ? 'error-message' : 'hidden';

        return (
            <div className={errorClass}>
                <span className='help-block'>{this.props.errorMessage}</span>
            </div>
        )
    }
}

export default InputError;